import { col } from 'sequelize';
import db from '../db/models/index.js';

const { User, Village, Commune, District, Province } = db;

export async function getVillage(req, res) {
  try {
    const { commune_id } = req.query
    if (!commune_id) {
      return res.status(400).json({ success: false, message: "Commune ID is required" });
    }
    const villages = await Village.findAll({
      where: { commune_id },
      attributes: ['id', 'name']
    });
    res.status(200).json({ success: true, data: villages });
  } catch (error) {
    console.error("Failed to fetch villages:", error);
    res.status(500).json({ success: false, message: "Failed to fetch villages" });
  }
}

export async function getCommune(req, res) {
  try {
    const { district_id } = req.query
    if (!district_id) {
      return res.status(400).json({ success: false, message: "District ID is required" });
    }
    const communes = await Commune.findAll({
      where: { district_id },
      attributes: ['id', 'name']
    });
    res.status(200).json({ success: true, data: communes });
  } catch (error) {
    console.error("Failed to fetch communes:", error);
    res.status(500).json({ success: false, message: "Failed to fetch communes" });
  }
}

export async function getDistrict(req, res) {
  try {
    const { province_id } = req.query
    if (!province_id) {
      return res.status(400).json({ success: false, message: "Province ID is required" });
    }
    const districts = await District.findAll({
      where: { province_id },
      attributes: ['id', 'name']
    });
    res.status(200).json({ success: true, data: districts });
  } catch (error) {
    console.error("Failed to fetch districts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch districts" });
  }
}

export async function getProvince(req, res) {
  try {
    const provinces = await Province.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json({ success: true, data: provinces });
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    res.status(500).json({ success: false, message: "Failed to fetch provinces" });
  }
}

export async function getUserAddress(req, res) {
  try {
    const userId = req.user.id;
    const address = await User.findByPk(userId, {
      attributes: [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        [col('Village.name'), 'village'],
        [col('Village.Commune.name'), 'commune'],
        [col('Village.Commune.District.name'), 'district'],
        [col('Village.Commune.District.Province.name'), 'province']
      ],
      include: [
        {
          model: Village,
          attributes: [],
          include: [
            {
              model: Commune,
              attributes: [],
              include: [
                {
                  model: District,
                  attributes: [],
                  include: [
                    {
                      model: Province,
                      attributes: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      raw: true
    });

    if (!address) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (error) {
    console.error("Failed to get address:", error);
    res.status(500).json({ success: false, message: "Failed to get address" });
  }
}

// Update user address
export async function updateUserAddress(req, res) {
  try {
    const userId = req.user.id;
    const { first_name, last_name, phone_number, village_id } = req.body;

    // Validate required fields
    if (!village_id) {
      return res.status(400).json({ 
        success: false, 
        message: "Village selection is required" 
      });
    }

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if village exists
    const village = await Village.findByPk(village_id);
    if (!village) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid village selected" 
      });
    }

    // Prepare update data - use existing values if new ones aren't provided
    const updateData = {
      village_id,
      // Only update name and phone if provided, otherwise keep existing values
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(phone_number && { phone_number })
    };

    // Update user address
    await user.update(updateData);

    // Return updated address with location names
    const updatedAddress = await User.findByPk(userId, {
      attributes: [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        [col('Village.name'), 'village'],
        [col('Village.Commune.name'), 'commune'],
        [col('Village.Commune.District.name'), 'district'],
        [col('Village.Commune.District.Province.name'), 'province']
      ],
      include: [
        {
          model: Village,
          attributes: [],
          include: [
            {
              model: Commune,
              attributes: [],
              include: [
                {
                  model: District,
                  attributes: [],
                  include: [
                    {
                      model: Province,
                      attributes: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      raw: true
    });

    res.status(200).json({ 
      success: true, 
      message: "Address updated successfully",
      data: updatedAddress 
    });
  } catch (error) {
    console.error("Failed to update address:", error);
    res.status(500).json({ success: false, message: "Failed to update address" });
  }
}