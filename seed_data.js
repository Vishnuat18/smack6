import { fs, doc, setDoc } from "./firebase-config.js";
import { subjectMaterials } from "./materials.js";

/**
 * Run this function once from the browser console on the Home page 
 * to seed your Firestore with real subject data.
 */
export async function seedFirestoreSubjects() {
    console.log("Starting Firestore Seeding...");
    
    try {
        const entries = Object.entries(subjectMaterials);
        for (const [key, data] of entries) {
            console.log(`Seeding subject: ${data.fullName}...`);
            await setDoc(doc(fs, "subjects", key), {
                name: data.fullName,
                fullName: data.fullName,
                shortName: data.shortName,
                courseCode: data.courseCode,
                icon: data.icon,
                materials: data.materials
            });
        }
        console.log("✅ Firestore Seeding Complete!");
        alert("Firestore seeded successfully! Refresh the page to see dynamic data.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        alert("Seeding failed. Check console for details.");
    }
}

// Attach to window for easy access in console
window.seedFirestore = seedFirestoreSubjects;
