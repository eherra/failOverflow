import Failure from "../../models/Failure";
import { ObjectId } from "mongodb";

const getTechDistribution = async (userId: string) => {
  const techData: any = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
      },
    },
    {
      $project: {
        technologies: 1,
      },
    },
    {
      $unwind: "$technologies",
    },
    {
      $group: {
        _id: "$technologies",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        techDistribution: {
          $push: {
            k: "$_id",
            v: "$count",
          },
        },
      },
    },
    {
      $set: {
        techDistribution: {
          $map: {
            input: "$techDistribution",
            in: {
              value: "$$this.v",
              name: "$$this.k",
            },
          },
        },
      },
    },
    {
      $project: {
        techDistribution: {
          $sortArray: {
            input: "$techDistribution",
            sortBy: {
              value: -1,
            },
          },
        },
      },
    },
  ]);
  return techData;
};

const getFailureCreatedDistribution = async (userId: string) => {
  const failureDistribution = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateFromParts: {
              year: {
                $year: "$createdAt",
              },
              month: {
                $month: "$createdAt",
              },
              day: {
                $dayOfMonth: "$createdAt",
              },
            },
          },
        },
        amount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.createdAt": 1,
      },
    },
    {
      $project: {
        _id: 0,
        amount: 1,
        date: {
          $dateToString: {
            date: "$_id.createdAt",
            format: "%d-%m-%Y",
          },
        },
      },
    },
  ]);
  return failureDistribution;
};

const getVoteDistribution = async (userId: string) => {
  const voteDistribution: any = await Failure.aggregate([
    {
      $match: {
        creator: new ObjectId(userId),
        "votes.0": {
          $exists: true,
        },
      },
    },
    {
      $lookup: {
        from: "votes",
        localField: "votes",
        foreignField: "_id",
        as: "votes",
      },
    },
    {
      $project: {
        "votes._id": 1,
        "votes.createdAt": 1,
      },
    },
    {
      $unwind: {
        path: "$votes",
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateFromParts: {
              year: {
                $year: "$votes.createdAt",
              },
              month: {
                $month: "$votes.createdAt",
              },
              day: {
                $dayOfMonth: "$votes.createdAt",
              },
            },
          },
        },
        amount: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.createdAt": 1,
      },
    },
    {
      $project: {
        _id: 0,
        amount: 1,
        date: {
          $dateToString: {
            date: "$_id.createdAt",
            format: "%d-%m-%Y",
          },
        },
      },
    },
  ]);
  return voteDistribution;
};

export default { getTechDistribution, getFailureCreatedDistribution, getVoteDistribution };
