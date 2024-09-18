'use client';

import prisma from "@/lib/prisma";

// GET  to retrieve the theme settings
export async function GET() {
    try {
        console.log('Fetching theme settings...');
        const themeSettings = await prisma.theme_settings.findFirst();
        console.log('Theme settings:', themeSettings);
        if (!themeSettings) {
            return new Response('Theme settings not found', { status: 404 });
        }
        return new Response(JSON.stringify(themeSettings), { status: 200 });
    } catch (error) {
        console.error('Error fetching theme settings:', error);
        return new Response('Error fetching theme settings', { status: 500 });
    }
}

// POST  to update or create theme settings
export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log('Received data to save:', data);

        const { primaryColor, secondaryColor, textPrimary, textSecondary, backgroundDefault } = data;

        const updatedThemeSettings = await prisma.theme_settings.upsert({
            where: { id: 1 }, // Looking for an entry with id: 1
            update: {
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                text_primary: textPrimary,
                text_secondary: textSecondary,
                background_default: backgroundDefault,
            },
            create: {
                id: 1, // If not found, create a new entry with id: 1
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                text_primary: textPrimary,
                text_secondary: textSecondary,
                background_default: backgroundDefault,
            },
        });

        console.log('Saved theme settings:', updatedThemeSettings);

        return new Response(JSON.stringify(updatedThemeSettings), { status: 200 });
    } catch (error) {
        console.error('Error updating theme settings:', error);
        return new Response('Error updating theme settings', { status: 500 });
    }
}