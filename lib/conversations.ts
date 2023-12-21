import { db } from "./db";

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
    let conversation =
        (await findConversations(memberOneId, memberTwoId)) ||
        (await findConversations(memberTwoId, memberOneId));

    if (!conversation)
        conversation = await createNewConversation(memberOneId, memberTwoId);

    return conversation;
};

const findConversations = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [{ memberOneId }, { memberTwoId }],
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (e) {
        return null;
    }
};

const createNewConversation = async ( memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (e) {
        return null;
    }
};
