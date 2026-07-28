import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
describe("Auth API", () => {

  it("should signup a user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe("test@test.com");
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should login a user and return cookie", async () => {
    // signup first
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "login@test.com",
        password: "password123"
      });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  it("should access /me with valid cookie", async () => {
    // signup
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Cookie User",
        email: "cookie@test.com",
        password: "password123"
      });

    // login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "cookie@test.com",
        password: "password123"
      });

    const cookie = loginRes.headers["set-cookie"];

    // access protected route
    const meRes = await request(app)
      .get("/api/auth/me")
      .set("Cookie", cookie);

    expect(meRes.statusCode).toBe(200);
    expect(meRes.body.success).toBe(true);
    expect(meRes.body.data.email).toBe("cookie@test.com");
  });

});


describe("Role-based Authorization", () => {

  it("should NOT allow normal user to create a course", async () => {
    // signup normal user
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Normal User",
        email: "user@test.com",
        password: "password123"
      });

    // login as normal user
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@test.com",
        password: "password123"
      });

    const cookie = loginRes.headers["set-cookie"];

    // attempt to create course
    const res = await request(app)
      .post("/api/courses")
      .set("Cookie", cookie)
      .send({
        title: "Unauthorized Course",
        description: "Should not be allowed"
      });

    expect(res.statusCode).toBe(403);
  });

  it("should allow ADMIN to create a course", async () => {
    // create admin directly (bypass signup)
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: "admin@test.com",
      passwordHash,
      role: "admin"
    });

    // login as admin
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "Admin@123"
      });

    const cookie = loginRes.headers["set-cookie"];

    // create course
    const res = await request(app)
      .post("/api/courses")
      .set("Cookie", cookie)
      .send({
        title: "Admin Course",
        description: "Created by admin",
        price: 999
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

});

describe("Courses API", () => {
  let adminCookie;
  let courseId;

  beforeEach(async () => {
    // create admin
    const passwordHash = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Admin",
      email: "courseadmin@test.com",
      passwordHash,
      role: "admin"
    });

    // login admin
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "courseadmin@test.com",
        password: "Admin@123"
      });

    adminCookie = loginRes.headers["set-cookie"];
  });

  it("should allow admin to create a course", async () => {
    const res = await request(app)
      .post("/api/courses")
      .set("Cookie", adminCookie)
      .send({
        title: "Node.js Mastery",
        description: "Complete backend course",
        price: 999,
        category: "Backend",
        difficulty: "intermediate"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Node.js Mastery");

    courseId = res.body.data._id;
  });

  it("should get all courses (public)", async () => {
    const res = await request(app).get("/api/courses");

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should get course by ID (public)", async () => {
    // create course first
    const createRes = await request(app)
      .post("/api/courses")
      .set("Cookie", adminCookie)
      .send({
        title: "Express Deep Dive",
        description: "Advanced Express concepts",
        price: 799
      });

    const id = createRes.body.data._id;

   const res = await request(app).get(`/api/courses/${id}`);


    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(id);
  });

  it("should return 400 for invalid course ID", async () => {
    const res = await request(app).get("/api/courses/123");

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});


describe("Enrollments & Progress Flow", () => {
  let adminCookie;
  let userCookie;
  let courseId;
  let enrollmentId;

  beforeEach(async () => {
    // create admin
    const adminHash = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Admin",
      email: "enrolladmin@test.com",
      passwordHash: adminHash,
      role: "admin"
    });

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "enrolladmin@test.com",
        password: "Admin@123"
      });

    adminCookie = adminLogin.headers["set-cookie"];

    // create course
    const courseRes = await request(app)
      .post("/api/courses")
      .set("Cookie", adminCookie)
      .send({
        title: "Testing Backend Systems",
        description: "Complete testing guide",
        lessons: [
          { title: "Intro", order: 1 }
        ]
      });

    courseId = courseRes.body.data._id;

    // signup user
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Student",
        email: "student@test.com",
        password: "password123"
      });

    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "student@test.com",
        password: "password123"
      });

    userCookie = userLogin.headers["set-cookie"];
  });

  it("should allow user to enroll in course", async () => {
    const res = await request(app)
      .post("/api/enrollments")
      .set("Cookie", userCookie)
      .send({
        courseId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);

    enrollmentId = res.body.data._id;
  });

  it("should get user's enrollments", async () => {
    // enroll first
    const enrollRes = await request(app)
      .post("/api/enrollments")
      .set("Cookie", userCookie)
      .send({ courseId });

    enrollmentId = enrollRes.body.data._id;

    const res = await request(app)
      .get("/api/enrollments/me")
      .set("Cookie", userCookie);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it("should allow user to update progress", async () => {
    // enroll
    const enrollRes = await request(app)
      .post("/api/enrollments")
      .set("Cookie", userCookie)
      .send({ courseId });

    enrollmentId = enrollRes.body.data._id;

    const res = await request(app)
      .put(`/api/enrollments/${enrollmentId}/progress`)
      .set("Cookie", userCookie)
      .send({
        lessonId: "intro",
        completed: true
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should NOT allow another user to update progress", async () => {
    // enroll
    const enrollRes = await request(app)
      .post("/api/enrollments")
      .set("Cookie", userCookie)
      .send({ courseId });

    enrollmentId = enrollRes.body.data._id;

    // create second user
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Hacker",
        email: "hacker@test.com",
        password: "password123"
      });

    const hackerLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "hacker@test.com",
        password: "password123"
      });

    const hackerCookie = hackerLogin.headers["set-cookie"];

    const res = await request(app)
      .put(`/api/enrollments/${enrollmentId}/progress`)
      .set("Cookie", hackerCookie)
      .send({
        lessonId: "intro",
        completed: true
      });

    expect(res.statusCode).toBe(403);
  });
});



describe("Course Update/Delete Authorization", () => {
  let adminCookie;
  let userCookie;
  let courseId;

  beforeEach(async () => {
    // create admin
    const adminHash = await bcrypt.hash("Admin@123", 10);
    await User.create({
      name: "Admin",
      email: "updateadmin@test.com",
      passwordHash: adminHash,
      role: "admin"
    });

    const adminLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "updateadmin@test.com",
        password: "Admin@123"
      });

    adminCookie = adminLogin.headers["set-cookie"];

    // create course
    const courseRes = await request(app)
      .post("/api/courses")
      .set("Cookie", adminCookie)
      .send({
        title: "Original Title",
        description: "Original description",
        price: 499
      });

    courseId = courseRes.body.data._id;

    // create normal user
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "User",
        email: "updateuser@test.com",
        password: "password123"
      });

    const userLogin = await request(app)
      .post("/api/auth/login")
      .send({
        email: "updateuser@test.com",
        password: "password123"
      });

    userCookie = userLogin.headers["set-cookie"];
  });

  it("should allow ADMIN to update a course", async () => {
    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set("Cookie", adminCookie)
      .send({
        title: "Updated Title"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Updated Title");
  });

  it("should NOT allow USER to update a course", async () => {
    const res = await request(app)
      .put(`/api/courses/${courseId}`)
      .set("Cookie", userCookie)
      .send({
        title: "Hacked Title"
      });

    expect(res.statusCode).toBe(403);
  });

  it("should allow ADMIN to delete a course", async () => {
    const res = await request(app)
      .delete(`/api/courses/${courseId}`)
      .set("Cookie", adminCookie);

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should NOT allow USER to delete a course", async () => {
    const res = await request(app)
      .delete(`/api/courses/${courseId}`)
      .set("Cookie", userCookie);

    expect(res.statusCode).toBe(403);
  });
});
