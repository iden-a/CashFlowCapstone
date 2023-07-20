const User = require("./user");

let count = 6
describe("fetch by email", () => {
  test("fetchUserByEmail should return a user object when a valid email is provided.", async () => {
    const validEmail = "pelumi.tayoorisadare@gmail.com";
    const result = await User.fetchUserByEmail(validEmail);

    expect(result).toEqual({
      id: 1,
      email: 'pelumi.tayoorisadare@gmail.com',
      password: "$2b$13$o3g4LuFoGZvWhiCWZU4pxutm54.XHvQknjdymh4fpPbF9D5bkDcSW",
      first_name: "pelumi",
      last_name: "tayo",
      username: "pelumitayo",
      total_points: 800,
      image_url: null,
    });
  });
  test("unauth if no such user", async () => {
    const invalidEmail = "pelumi@gmail.com"
    const result = await User.fetchUserByEmail(invalidEmail)
    expect(result).toBeUndefined()
  });

  test("unauth if no such user", async () => {
    const invalidEmail = "pelumigmail.com"
    const result = await User.fetchUserByEmail(invalidEmail)
    expect(result).toBeUndefined()
  });
});


describe("register user", () => {
    test("register should return a user object when an email has not been duplicated in the database.", async () => {
        
            const email = `testingmything${count}@gmail.com`
            const password =  "testingg"
            const username = "testing"
            const first_name = "testing_first"
            const last_name = "testing_last"	
            const result = await User.register({email, password, username, first_name, last_name});
  
      expect(result).toEqual({
            id: 12,
            first_name: "testing_first",
            last_name: "testing_last",
            username: "testing",
            email: `testingmything${count}@gmail.com`,
            total_points: 0
      });
      count += 1
    });

    test("user should not be allowed to register if duplicate email", async () => {
        const email = "pelumi.tayoorisadare@gmail.com"
        const password =  "testingg"
        const username = "testing"
        const first_name = "testing_first"
        const last_name = "testing_last"	
        try {
            await User.register({ email, password, username, first_name, last_name });
            // If the registration succeeds, fail the test since it should not allow duplicate emails
            fail("Expected an error to be thrown");
          } catch (error) {
            // Expect an error to be thrown
            expect(error).toBeDefined();
          }
      });
  });
  
  describe("login user", () => {
    test("login should return a user object a valid email and password is given", async () => {
        
            const email = "testingmything3@gmail.com"
            const password =  "testingg"
            
            const result = await User.authenticate({email, password});
  
      expect(result).toEqual({
        user: {
            id: 10,
            first_name: "testing_first",
            last_name: "testing_last",
            username: "testing",
            email: "testingmything3@gmail.com",
            total_points: 0,
            image_url: null
        },
        goals: [],
        quizzes: []
      });
    });

    test("login should return an error if invalid emaill or password is given", async () => {
        
        const email = "testingmything3@gmail.com"
        const password =  "testinggg"
        
        try {
            await User.authenticate({ email, password });
            // If the registration succeeds, fail the test since it should not allow duplicate emails
            fail("Expected an error to be thrown");
          } catch (error) {
            // Expect an error to be thrown
            expect(error).toBeDefined();
          }
      });
      
  });
  