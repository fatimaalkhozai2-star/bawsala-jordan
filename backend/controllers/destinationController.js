
const createDestination = async (req, res) => {
  try {
    const { location } = req.body;

    if (location) {
      const { latitude, longitude } = location;

      if (
        (latitude !== undefined && (latitude < -90 || latitude > 90)) ||
        (longitude !== undefined && (longitude < -180 || longitude > 180))
      ) {
        return res.status(400).json({
          message: "Invalid location coordinates"
        });
      }
    }

    const destination = await Destination.create(req.body);

    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
