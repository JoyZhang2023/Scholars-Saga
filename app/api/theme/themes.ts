import prisma from "../../../lib/prisma";

export async function GET() {
    try {
        const themeSettings = await prisma.themeSettings.findFirst(); // Assuming there is only one global theme setting
        if (!themeSettings) {
            return new Response('Theme settings not found', { status: 404 });
        }
        return new Response(JSON.stringify(themeSettings), { status: 200 });
    } catch (error) {
        console.error('Error fetching theme settings:', error);
        return new Response('Error fetching theme settings', { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { primaryColor, secondaryColor, textPrimary, textSecondary, backgroundDefault } = await request.json();

        const updatedThemeSettings = await prisma.themeSettings.upsert({
            where: { id: 1 },
            update: {
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                text_primary: textPrimary,
                text_secondary: textSecondary,
                background_default: backgroundDefault,
            },
            create: {
                id: 1,
                primary_color: primaryColor,
                secondary_color: secondaryColor,
                text_primary: textPrimary,
                text_secondary: textSecondary,
                background_default: backgroundDefault,
            },
        });

        return new Response(JSON.stringify(updatedThemeSettings), { status: 200 });
    } catch (error) {
        console.error('Error updating theme settings:', error);
        return new Response('Error updating theme settings', { status: 500 });
    }
}
