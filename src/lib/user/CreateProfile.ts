import db from "@/lib/db";

const createProfile = async (data: any) => {


    if (!data) {
        return new Response("No Token Available", { status: 401 });
    }

    const user = await db.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (!user) {
        const newUser = await db.user.create({
            data: {
                id: data?.id,
                email: data.email,
                name: data.name,
                imageUrl: data.picture,
                phone: "",
                status: "",
                userId: data.id,
            }
        })
        return newUser
    }

    return user;
}

export default createProfile;