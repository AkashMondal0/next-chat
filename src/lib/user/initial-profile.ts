import { getSession } from "@auth0/nextjs-auth0";
import db from "@/lib/db";

const getInitialProfile = async () => {
    const auth0_user = await getSession();

    if (!auth0_user) {
        return new Response("No Token Available", { status: 401 });
    }

    const user = await db.user.findFirst({
        where: {
            email: auth0_user?.user.email
        }
    })

    if (!user) {
        const newUser = await db.user.create({
            data: {
                id: auth0_user?.user.sid,
                email: auth0_user?.user.email,
                name: auth0_user.user.name,
                imageUrl: auth0_user.user.picture,
                userId: auth0_user.user.sid,
                phone: "",
                status: "",
            }
        })
        return newUser
    }

    return user;
}

export default getInitialProfile;