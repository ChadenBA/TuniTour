const jwt = require("jsonwebtoken");
const { verifyToken } = require("../../middleware/verifyToken");

describe.skip("verifyToken middleware", () => {
  it("should return 401 if no token is provided", () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "no token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 401 if invalid token is provided", () => {
    const req = { headers: { authorization: "Bearer invalid-token" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "invalidToken" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should add decoded payload to request object and call next if valid token is provided", () => {
    const payload = { id: "1234", isAdmin: true };
    const JWT_SECRET="dld,zkcf,kec,"
    const token = jwt.sign(payload, JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();
    verifyToken(req, res, next);
    expect(req.admin).toEqual(payload);
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
  });
});
