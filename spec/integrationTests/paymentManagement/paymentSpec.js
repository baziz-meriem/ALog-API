const request = require("supertest");
const app = require("../../../src/index.js");

const route = "/api/v1/paymentManagement/payment/";
const newPayment = {
  montant: 120,
  etat: "new state",
  typeCarte: "visa",
  monnaie: "dzd",
  idCommande: 4,
};

let newPaymentId;

describe("POST /api/v1/paymentManagement/payment/", () => {
  it("should create a new payment", async () => {
    const res = await request(app).post(route).send(newPayment);

    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("Payment created successfully");
    expect(res.body.data.montant).toBe(newPayment.montant);
    expect(res.body.data.etat).toBe(newPayment.etat);
    expect(res.body.data.typeCarte).toBe(newPayment.typeCarte);
    expect(res.body.data.monnaie).toBe(newPayment.monnaie);
    expect(res.body.data.id).toBeDefined();
    expect(res.body.data.date).toBeDefined();

    newPaymentId = res.body.data.id;
  });

  it("should return a 400 status if an error occurs while creating the new payment", async () => {
    const InvalidPayment = {
      montant: 120,
      etat: "new state",
      typeCarte: "visa",
      monnaie: "dzd",
      idCommande: 999,
    };
    const res = await request(app).post(route).send(InvalidPayment);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("Bad Request");
    expect(res.body.message).toBe(
      "Error while creating a new payment in database"
    );
  });
});

describe("GET /api/v1/paymentManagement/payment/", () => {
  it("should return an array of all payments instances in database", async () => {
    const res = await request(app).get(route);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);

    res.body.data.forEach((payment) => {
      expect(payment.id).toBeDefined();
      expect(payment.date).toBeDefined();
      expect(payment.etat).toBeDefined();
      expect(payment.idCommande).toBeDefined();
      expect(payment.montant).toBeDefined();
      expect(payment.typeCarte).toBeDefined();
    });
  });
});

describe("GET /api/v1/paymentManagement/payment/:id", () => {
  it("should return a single payment if a valid id is passed", async () => {
    const res = await request(app)
      .get(route + `/${newPaymentId}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.id).toBe(newPaymentId);
  });

  it("should return 400 status if invalid id is passed", async () => {
    const invalidId = 99999;

    const res = await request(app)
      .get(route + `/${invalidId}`)
      .send();

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("Bad Request");
    expect(res.body.message).toBe("Error while getting payment, invalid id");
  });
});

describe("PUT updateHandler", () => {
  it("should update the state of a payment", async () => {
    const updatedPayment = await request(app)
      .put(route + `${newPaymentId}`)
      .send({ etat: "updated state" });

    expect(updatedPayment.status).toBe(200);
    expect(updatedPayment.body.status).toBe("OK");
    expect(updatedPayment.body.data.etat).toBe("updated state");
  });
});

describe("DELETE /api/v1/paymentManagement/payment/:id ", () => {
  it("should return a 400 status if the id is invalid", async () => {
    const res = await request(app).delete(route + `/999`);

    expect(res.status).toBe(400);
    expect(res.body.status).toBe("Bad Request");
    expect(res.body.message).toBe(
      "Error while deleting payment, id is not valid"
    );
  });
  it("should delete a commande and return a 200 status", async () => {
    const res = await request(app).delete(route + `${newPaymentId}`);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("OK");
    expect(res.body.message).toBe("Payment deleted successfully");
    expect(res.body.data.id).toBe(newPaymentId);
  });
});
