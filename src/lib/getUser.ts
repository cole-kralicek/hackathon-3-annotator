"use server";
import { auth } from "@clerk/nextjs/server";

const getUser = async () => {
    const { userId } = auth();
    return userId;
};

export default getUser;