const request = require("supertest");
const app = require("../../../src/index.js");
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

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
  it("should return an array of all payments inpaystances in database", async () => {
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



//--------------Stripe tests -------------------

let paymentIntentid ;
let paymentIntentid2 ;

describe("POST /api/v1/paymentManagement/payment/pay", () => {
  it("should create a payment intent successfully", async () => {
    const paymentData = {
      cardNumber: "4000056655665556",
      expMonth: "11",
      expYear: "2025",
      cvc: "125",
      email: "jm_baziz@esi.dz",
      amount: 10000,
      currency: "dzd",
      boissonLabel:"lait au chocolat",
      distributeurId:1,
      boissonId:1,
      commandeId:9
    }

    const res = await request(app)
      .post(route + `/pay`)
      .send(paymentData)
      .expect(200);

    expect(res.body.status).toBe("OK");
    expect(res.body.data.paymentIntentId).toBeDefined();
    expect(res.body.data.clientSecret).toBeDefined();
    paymentIntentid = res.body.data.paymentIntentId
  });
  //creating the second paymentIntent for the 2nd cancel case
  it("should create a payment intent successfully", async () => {
    const paymentData = {
      cardNumber: "4000056655665556",
      expMonth: "11",
      expYear: "2027",
      cvc: "127",
      email: "jm_baziz@esi.dz",
      amount: 10000,
      currency: "dzd",
      boissonLabel:"lait",
      distributeurId:1,
      boissonId:1,
      commandeId:9
    }

    const res = await request(app)
      .post(route + `/pay`)
      .send(paymentData)
      .expect(200);

    expect(res.body.status).toBe("OK");
    expect(res.body.data.paymentIntentId).toBeDefined();
    expect(res.body.data.clientSecret).toBeDefined();
    paymentIntentid2 = res.body.data.paymentIntentId
  });

  it("should return an error for invalid card number", async () => {
    const invalidPaymentData = {
      cardNumber: "42424242424",
      expMonth: "12",
      expYear: "2022",
      cvc: "123",
      email: "test@example.com",
      amount: 100,
      currency: "usd",
      boissonLabel: "Coca Cola",
      distributeurId: 1,
      boissonId: 2,
      commandeId: 3,
    };

    const res = await request(app)
      .post(route+ `/pay`)
      .send(invalidPaymentData)
      .expect(400);

    expect(res.body.status).toBe("Bad Request");
    expect(res.body.message).toBe("Invalid card number. Please enter a valid credit card number.");
  });
});
describe('confirmPaymentHandler', () => {
  it('should confirm a payment intent and return a success response', async () => {
  
    const response = await request(app)
      .put(route + `/confirm`)
      .send({ paymentIntentId:paymentIntentid });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.message).toBe('payment confirmed successfully');
    expect(response.body.data).toBe('succeeded');
  });

  it('should return an error response if payment confirmation fails', async () => {
    const invalidPaymentIntentId = 'pi_4851q'; // replace with an invalid payment intent ID

    const response = await request(app)
      .put(route + `/confirm`)
      .send({ paymentIntentId: invalidPaymentIntentId });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('Bad Request');
    expect(response.body.message).toBe('payment confirmation failed');
  });
});

describe('cancelPayementHandler', () => {
  it('should cancel a PaymentIntent that has not been captured', async () => {

    // Send a POST request to the cancelPayementHandler endpoint with the PaymentIntent ID
    const res = await request(app)
      .put(route + `/cancel`)
      .send({ paymentIntentId: paymentIntentid2 });

    // Expect the response to have a 200 status code and a success message
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('OK');
    expect(res.body.message).toEqual('payment canceled successfully');
    expect(res.body.data).toEqual('canceled');
  });

  it('should call the refunding function for a PaymentIntent that has been captured', async () => {

    // Send a POST request to the cancelPayementHandler endpoint with the PaymentIntent ID
    const res = await request(app)
      .put(route + `/cancel`)
      .send({ paymentIntentId: paymentIntentid });

    // Expect the response to have a 200 status code and a success message
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual('OK');
    expect(res.body.message).toEqual('payment refunded successfully');
  });

  it('should return a 400 status code and an error message for an invalid PaymentIntent ID', async () => {
    // Send a POST request to the cancelPayementHandler endpoint with an invalid PaymentIntent ID
    const invalid_id = 'pi5_3N0BXgAIIjdIkPoT1ljj3eK67'
    const res = await request(app)
      .put(route + `/cancel`)
      .send({ paymentIntentId: invalid_id });

    // Expect the response to have a 400 status code and an error message
    expect(res.status).toEqual(400);
    expect(res.body.status).toEqual('Bad Request');
    expect(res.body.message).toEqual('payment cancelation failed');
    expect(res.body.error).toEqual(`No such payment_intent: '${invalid_id}'`);
  });
});


