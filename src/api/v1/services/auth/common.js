const prisma = require('../../../../config/dbConfig')

const getAgentByEmail = async (email) => {
    /**
     * @description get the agent (sadm , adm , decideur or ac) with email from the database and return it as an object or null if there is an error
     * @param {string} email
    */
    try {
        let agent = await prisma.AC.findUnique({
            where: {
                email: email
            }
        });
        if (agent) return "ac";
        agent = await prisma.aDM.findUnique({
            where: {
                email: email
            }
        });

        if (agent) return "adm";
        agent = await prisma.decideur.findUnique({
            where: {
                email: email
            }
        });

        if (agent) return "decideur";
        agent = await prisma.SADM.findUnique({
            where: {
                email: email
            }
        });
        if (agent) return "sadm";
    } catch (error) {
        return null;
    }
}


module.exports = { getAgentByEmail }