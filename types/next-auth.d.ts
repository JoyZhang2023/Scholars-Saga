import { role_enum } from "@prisma/client";
import type { User } from "next-auth";
import 'next-auth/jwt';

type userId = string
type userEmail = string
type userProfileId = string

declare module 'next-auth/jwt' {
    interface JWT {
        id: userId
        email: userEmail
        role: role_enum
        profile_id: userProfileId
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: userId
            email: userEmail
            role: role_enum
        }
    }
}