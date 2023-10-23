import { getSession } from "@auth0/nextjs-auth0";
import db from "../db";

const getCurrentProfile = async () => {
    const auth0_user = await getSession();

    if (!auth0_user) {
        return new Response("No Token Available", { status: 401 });
    }

    const user = await db.user.findUnique({
        where: {
            id: auth0_user?.user.sid
        }
    })
    if (!user) {
        return new Response("No User Found", { status: 404 });
    }
    return user;
}

export default getCurrentProfile;