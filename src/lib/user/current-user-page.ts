import db from "../db";

const getCurrentProfile = async (userId:string) => {

    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        return new Response("No User Found", { status: 404 });
    }
    return user;
}

export default getCurrentProfile;