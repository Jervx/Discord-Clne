import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const serverId = searchParams.get("serverId");

        if (!profile) return new NextResponse("UNAUTHORIZED", { status: 401 });

        if (!serverId)
            return new NextResponse("Missing Server ID", { status: 400 });

        if (!params.memberId)
            return new NextResponse("Missing Member ID", { status: 401 });

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                        id: params.memberId,
                        profileId: {
                            not: profile.id,
                        },
                    },
                },
            },
            include : {
                members : {
                    include : {
                        profile : true
                    },
                    orderBy : {
                        role : 'asc'
                    }
                }
            }
        });

        return NextResponse.json(server)
    } catch (error) {
        console.log("[MEMBER DELETE]");
        return new NextResponse("INTERNAL ERROR", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { memberId: string } }
) {
    try {
        const profile = await currentProfile();
        const { searchParams } = new URL(req.url);
        const { role } = await req.json();

        const serverId = searchParams.get("serverId");

        if (!profile) return new NextResponse("UNAUTHORIZED", { status: 401 });

        if (!serverId)
            return new NextResponse("Server ID missing", { status: 400 });

        if (!params.memberId)
            return new NextResponse("Member ID missing", { status: 500 });

        const server = await db.server.update({
            where: { id: serverId, profileId: profile.id },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            profileId: { not: profile.id },
                        },
                        data: {
                            role,
                        },
                    },
                },
            },
            include: {
                members: {
                    include: {
                        profile: true,
                    },
                    orderBy: {
                        role: "asc",
                    },
                },
            },
        });

        return NextResponse.json(server);
    } catch (error) {
        console.log("[MEMBERS PATCH]", error);
        return new NextResponse("INTERNAL ERROR", { status: 500 });
    }
}
