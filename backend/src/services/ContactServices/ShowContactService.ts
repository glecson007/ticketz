import Contact from "../../models/Contact";
import AppError from "../../errors/AppError";

const ShowContactService = async (
  id: string | number,
  companyId?: number
): Promise<Contact> => {
  const contact = await Contact.findByPk(id, {
    include: ["tags", "extraInfo"]
  });

  if (companyId && contact?.companyId !== companyId) {
    throw new AppError("Não é possível consultar registro de outra empresa");
  }

  if (!contact) {
    throw new AppError("ERR_NO_CONTACT_FOUND", 404);
  }

  return contact;
};

export default ShowContactService;
