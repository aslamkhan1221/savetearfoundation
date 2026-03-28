"use server";

import db, { Slide, Case } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

// Helper to save uploaded files
async function saveFile(file: File, folder: string): Promise<string> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);

    return `/uploads/${folder}/${fileName}`;
}

export async function getSlides(): Promise<Slide[]> {
    const slides = db.prepare("SELECT * FROM slides ORDER BY order_index ASC").all() as Slide[];
    return slides;
}

export async function addSlide(formData: FormData) {
    const image_url = formData.get("image_url") as string;
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;

    if (!image_url || !title || !subtitle) {
        throw new Error("Missing required fields");
    }

    db.prepare("INSERT INTO slides (image_url, title, subtitle) VALUES (?, ?, ?)")
        .run(image_url, title, subtitle);

    revalidatePath("/");
    revalidatePath("/admin");
}

export async function deleteSlide(id: number) {
    db.prepare("DELETE FROM slides WHERE id = ?").run(id);
    revalidatePath("/");
    revalidatePath("/admin");
}

// Case Actions
export async function getCases(type?: string): Promise<Case[]> {
    if (type) {
        return db.prepare("SELECT * FROM cases WHERE type = ? ORDER BY created_at DESC").all(type) as Case[];
    }
    return db.prepare("SELECT * FROM cases ORDER BY created_at DESC").all() as Case[];
}

export async function getCaseById(id: number): Promise<Case | undefined> {
    return db.prepare("SELECT * FROM cases WHERE id = ?").get(id) as Case | undefined;
}


function createSlug(name: string) {
    return name
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w-]+/g, ''); // Remove all non-word chars
}

export async function getCaseBySlug(slug: string): Promise<Case | undefined> {
    return db.prepare("SELECT * FROM cases WHERE slug = ?").get(slug) as Case | undefined;
}

export async function addCase(formData: FormData) {
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const details = formData.get("details") as string;
    const family_background = formData.get("family_background") as string;
    const appeal = formData.get("appeal") as string;

    const photoFile = formData.get("photo") as File;
    const supportDocFiles = formData.getAll("support_document") as File[];

    if (!name || !type || !photoFile) {
        throw new Error("Missing required fields");
    }

    const slug = createSlug(name);

    let image_url = "";
    if (photoFile.size > 0) {
        image_url = await saveFile(photoFile, "cases");
    }

    let support_documents: string[] = [];
    for (const file of supportDocFiles) {
        if (file && file.size > 0) {
            const url = await saveFile(file, "documents");
            support_documents.push(url);
        }
    }

    db.prepare(`
        INSERT INTO cases (name, slug, type, image_url, details, family_background, appeal, support_documents)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, slug, type, image_url, details, family_background, appeal, JSON.stringify(support_documents));

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/cases/${slug}`);
}

export async function updateCase(formData: FormData) {
    const id = Number(formData.get("id"));
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const details = formData.get("details") as string;
    const family_background = formData.get("family_background") as string;
    const appeal = formData.get("appeal") as string;

    const photoFile = formData.get("photo") as File;
    const supportDocFiles = formData.getAll("support_document") as File[];

    if (!id || !name || !type) {
        throw new Error("Missing required fields");
    }

    const slug = createSlug(name);

    const currentCase = db.prepare("SELECT * FROM cases WHERE id = ?").get(id) as Case;
    if (!currentCase) throw new Error("Case not found");

    let image_url = currentCase.image_url;
    if (photoFile && photoFile.size > 0) {
        image_url = await saveFile(photoFile, "cases");
    }

    let support_documents = JSON.parse(currentCase.support_documents || "[]");
    if (supportDocFiles.some(f => f.size > 0)) {
        // If new documents are uploaded, we append them or replace?
        // Let's replace for simplicity or keep existing?
        // User said "multiple upload option", usually means replacing the set or adding.
        // Let's replace the existing documents if new ones are provided.
        const newDocs = [];
        for (const file of supportDocFiles) {
            if (file && file.size > 0) {
                const url = await saveFile(file, "documents");
                newDocs.push(url);
            }
        }
        if (newDocs.length > 0) support_documents = newDocs;
    }

    db.prepare(`
        UPDATE cases 
        SET name = ?, slug = ?, type = ?, image_url = ?, details = ?, family_background = ?, appeal = ?, support_documents = ?
        WHERE id = ?
    `).run(name, slug, type, image_url, details, family_background, appeal, JSON.stringify(support_documents), id);

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath(`/cases/${slug}`);
}

export async function deleteCase(id: number) {
    // Optionally delete files here too, but for now just remove DB entry
    db.prepare("DELETE FROM cases WHERE id = ?").run(id);
    revalidatePath("/");
    revalidatePath("/admin");
}

export async function seedInitialSlides() {
    const count = (db.prepare("SELECT COUNT(*) as count FROM slides").get() as any).count;
    if (count === 0) {
        const initialSlides = [
            {
                image_url: "/images/khushiyon-ki-thali.jpg",
                title: "Empower The Woman",
                subtitle: "To Empower The Society",
            },
            {
                image_url: "/images/critical-medical-support.jpg",
                title: "To End Hunger",
                subtitle: "Let's Work Together",
            },
            {
                image_url: "/images/Ration-Distribution-Neha-1.jpg",
                title: "To End Hunger",
                subtitle: "Let's Work Together",
            },
            {
                image_url: "/images/calamity-support.jpg",
                title: "To End Hunger",
                subtitle: "Let's Work Together",
            }
        ];

        const insert = db.prepare("INSERT INTO slides (image_url, title, subtitle) VALUES (?, ?, ?)");
        for (const slide of initialSlides) {
            insert.run(slide.image_url, slide.title, slide.subtitle);
        }
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email === "admin@gmail.com" && password === "password") {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });
        redirect("/admin");
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}

export async function isAuthenticated() {
    const cookieStore = await cookies();
    return cookieStore.get("admin_session")?.value === "true";
}
