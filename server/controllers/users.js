import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ error: err.message });
    };
};

export const getUserPartners = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const partners = await Promise.all(
            user.partners.map((id) => User.findById(id))
        );
        const formattedPartners = partners.map(
            ({ _id, firstName, lastName, profession, location, picturePath }) => {
                return { _id, firstName, lastName, profession, location, picturePath };
            }
        )
        res.status(200).json(formattedPartners);
    } catch (err) {
        res.status(404).json({ error: err.message });
    };
};

export const addRemovePartner = async (req, res) => {
    try {
        const { id, partnerId } = req.params;
        const user = await User.findById(id);
        const partner = await User.findById(partnerId);

        if (user.partners.includes(partnerId)) {
            user.partners = user.partners.filter((prtId) => prtId !== partnerId);
            partner.partners = partner.partners.filter((id) => id !== id);
        } else {
            user.partners.push(partnerId);
            partner.partners.push(id);
        }
        await user.save();
        await partner.save();

        const partners = await Promise.all(
            user.partners.map((id) => User.findById(id))
        );
        const formattedPartners = partners.map(
            ({ _id, firstName, lastName, profession, location, picturePath }) => {
                return { _id, firstName, lastName, profession, location, picturePath };
            }
        )
        res.status(200).json(formattedPartners);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};