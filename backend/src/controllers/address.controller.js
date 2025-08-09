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

export async function updateUserAddress(req, res) {
  try {
    const userId = req.user.id;
    const { village_id } = req.body;

    if (!village_id) {
      return res.status(400).json({ success: false, message: "Village ID is required" });
    }

    // Verify that the village exists
    const village = await Village.findByPk(village_id);
    if (!village) {
      return res.status(404).json({ success: false, message: "Village not found" });
    }

    // Update user's village_id
    await User.update(
      { village_id },
      { where: { id: userId } }
    );

    // Get updated address information
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