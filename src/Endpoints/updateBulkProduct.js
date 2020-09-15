/* eslint-disable max-len */
const joi = require('@hapi/joi');
const csvProject = require('../Controllers/csvProject');
const { validateRequest } = require('../middlewares/requestValidator');

const schema = {
  body: {
    data: joi.string().required(),
  },
};

// const data = [
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Footway',
//     rate: 30,
//     id: 1,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Footway',
//     rate: 60,
//     id: 2,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Footway',
//     rate: 60,
//     id: 3,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Footway',
//     rate: 60,
//     id: 4,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Carriageway',
//     rate: 111,
//     id: 5,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Carriageway',
//     rate: 116,
//     id: 6,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Carriageway',
//     rate: 112,
//     id: 7,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Carriageway',
//     rate: 119,
//     id: 8,
//   },
//   {
//     supplier: 'JSM',
//     name: '3 x 96mm Duct in Carriageway',
//     rate: 126,
//     id: 9,
//   },
//   {
//     supplier: 'JSM',
//     name: '2x 96mm and 1 x 54mm in Carriageway',
//     rate: 121,
//     id: 10,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Swept Tee',
//     rate: 25,
//     id: 11,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Y Duct',
//     rate: 25,
//     id: 12,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Installation of Bend and Toby Box',
//     rate: 60,
//     id: 13,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Footway exc Material',
//     rate: 60.50,
//     id: 14,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Footway exc Material',
//     rate: 56.92,
//     id: 15,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Footway exc Material',
//     rate: 53.04,
//     id: 16,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Footway exc Material',
//     rate: 56.08,
//     id: 17,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Carriageway exc Material',
//     rate: 109.96,
//     id: 18,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Carriageway exc Material',
//     rate: 113.92,
//     id: 19,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Carriageway exc Material',
//     rate: 110.04,
//     id: 20,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Carriageway exc Material',
//     rate: 115.08,
//     id: 21,
//   },
//   {
//     supplier: 'JSM',
//     name: '3 x 96mm Duct in Carriageway exc Material',
//     rate: 120.12,
//     id: 22,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm and 1 x 54mm in Carriageway exc Material',
//     rate: 116.04,
//     id: 23,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Swept Tee exc Material',
//     rate: 20.65,
//     id: 24,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Y Duct exc Material',
//     rate: 20.65,
//     id: 25,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Installation of Bend and Toby Box exc Material',
//     rate: 53.4,
//     id: 26,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW1 in Carriageway',
//     rate: 1455,
//     id: 27,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW2 in Carriageway',
//     rate: 2129,
//     id: 28,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW3 (Cabinets)',
//     rate: 2565,
//     id: 29,
//   },
//   {
//     supplier: 'JSM',
//     name: 'FW6 in Footway',
//     rate: 1081,
//     id: 30,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.4 Recessed Lids',
//     rate: 1144,
//     id: 31,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.6 Recessed Lids',
//     rate: 1681,
//     id: 32,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Connect 1 x 96mm into Existing Chamber',
//     rate: 250,
//     id: 33,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Connect 2 x 96mm into Existing Chamber',
//     rate: 340,
//     id: 34,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Connect 3 x 96mm into Existing Chamber',
//     rate: 430,
//     id: 35,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Connect into Existing Colt Chamber',
//     rate: 450,
//     id: 36,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CC1 in Footway (Stakkabox) exc Material',
//     rate: 0,
//     id: 37,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Access Chamber in Footway exc Material',
//     rate: 225,
//     id: 38,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW1 in Carriageway (Cover & Frame) exc Material',
//     rate: 1205,
//     id: 39,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW2 in Carriageway (Cover & Frame) exc Material',
//     rate: 1491,
//     id: 40,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW3 in Carriageway (Cover & Frame) exc Material',
//     rate: 1655,
//     id: 41,
//   },
//   {
//     supplier: 'JSM',
//     name: 'FW6 in Footway (Chamber Sections & Cover & Frame) exc Material',
//     rate: 651,
//     id: 42,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.4 Recessed Lids exc Material',
//     rate: 799,
//     id: 43,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.6 Recessed Lids exc Material',
//     rate: 1152,
//     id: 44,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Size 1m x 1m x 1m deep in Footway',
//     rate: 191,
//     id: 45,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Size 1m x 1m x 1m deep in Carriageway',
//     rate: 300,
//     id: 46,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Extra over for reinstating with shell grip or similar anti-skid surfacing if over 10m2',
//     rate: 0,
//     id: 47,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Extra over for reinstating with shell grip or similar anti-skid surfacing if over 10m2',
//     rate: 0,
//     id: 48,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Steel Plates over shallow services',
//     rate: 5.75,
//     id: 49,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Provide Stats',
//     rate: 95,
//     id: 50,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Planning and Stakeholder Engagement',
//     rate: 0,
//     id: 51,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Footway - Material',
//     rate: 6.50,
//     id: 52,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Footway - Material',
//     rate: 2.08,
//     id: 53,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Footway - Material',
//     rate: 1.96,
//     id: 54,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Footway - Material',
//     rate: 3.92,
//     id: 55,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 54mm Duct in Carriageway - Material',
//     rate: 1.04,
//     id: 56,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 54mm Duct in Carriageway - Material',
//     rate: 2.08,
//     id: 57,
//   },
//   {
//     supplier: 'JSM',
//     name: '1 x 96mm Duct in Carriageway - Material',
//     rate: 1.96,
//     id: 58,
//   },
//   {
//     supplier: 'JSM',
//     name: '2 x 96mm Duct in Carriageway - Material',
//     rate: 3.92,
//     id: 59,
//   },
//   {
//     supplier: 'JSM',
//     name: '3 x 96mm Duct in Carriageway - Material',
//     rate: 5.88,
//     id: 60,
//   },
//   {
//     supplier: 'JSM',
//     name: '2x 96mm and 1 x 54mm in Carriageway - Material',
//     rate: 4.96,
//     id: 61,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Swept Tee - Material',
//     rate: 4.35,
//     id: 62,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Y Duct - Material',
//     rate: 4.35,
//     id: 63,
//   },
//   {
//     supplier: 'JSM',
//     name: 'Installation of Bend and Toby Box - Material',
//     rate: 6.6,
//     id: 64,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW1 in Carriageway - Material',
//     rate: 250,
//     id: 65,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW2 in Carriageway - Material',
//     rate: 638,
//     id: 66,
//   },
//   {
//     supplier: 'JSM',
//     name: 'CW3 (Cabinets) - Material',
//     rate: 910,
//     id: 67,
//   },
//   {
//     supplier: 'JSM',
//     name: 'FW6 in Footway - Material',
//     rate: 430,
//     id: 68,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.4 Recessed Lids - Material',
//     rate: 345,
//     id: 69,
//   },
//   {
//     supplier: 'JSM',
//     name: 'BT No.6 Recessed Lids - Material',
//     rate: 529,
//     id: 70,
//   },
// ];

async function handler(req, res) {
  const response = await csvProject.updateBulkProduct(req.body.data);
  res.status(200).json(response);
}

module.exports = [validateRequest(schema), handler];
