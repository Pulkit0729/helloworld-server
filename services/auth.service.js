const aud = require('../config/aud').aud;
const utils = require('../utils/userUtils');
const aql = require("arangojs").aql;
const db = require("../config/arangojs").connectDb();
const usersCollection = db.collection("users");

class AuthService {


  async register(userObj) {
    const session = this.driver.session()
    try {
      const res = await session.readTransaction(async tx => {
        const res1 = await tx.run(`
          MATCH (u: User {email:$email})
          RETURN u.emailConfirmed AS verify`, { email:userObj.email });
        if (res1.records==undefined) {
          return await this.createUser(userObj, tx)
        }
        else if (res1.records.length != 0 && res1.records[0].get('verify') === false) {
          if (await this.deleteUser(userObj.email, tx)) {
            return await this.createUser(userObj, tx)
          }
        } else {
          throw new Error('account already exists', {
            email: 'Email address taken'
          })
        }
      })

      const user = res.records[0].get('u')
      return user;
    } catch (e) {
      if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
        throw new Error('account already exists', {
          email: 'Email address taken'
        })
      }

      throw e
    }
    finally {
      await session.close()

    }

  }

  // async authenticate(email, unencryptedPassword) {
  //   const session = this.driver.session()
  //   const res = await session.readTransaction(tx => tx.run(`
  //     MATCH (u:User)
  //     WHERE u.email = $email
  //     RETURN u`, { email }))

  //   if (res.records.length === 0) {
  //     return false
  //   }
  //   const user = res.records[0].get('u')

  //   const encrypted = user.properties.password
  //   const correct = await compare(unencryptedPassword,
  //     encrypted)

  //   if (correct === false) {
  //     return false
  //   }

  //   const { password, ...safeProperties } = user.properties
  //   await session.close()

  //   return {
  //     ...safeProperties,
  //     token: jwt.sign(this.userToClaims(safeProperties), JWT_SECRET),
  //   }
  // }

  async deleteUser(email, tx) {
    try {
      await tx.run(`
      MATCH (u: User  {email: $email})
      DETACH DELETE u`,{ email});
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }

  }

  async createUser() {
    const res = await db.query(aql`
    INSERT 
    {"name": "John", "email": "John@gmail.com"}
    IN ${usersCollection}`).then((result)=>{
      console.log(result);
      return result;
    }).catch((err)=>{
      console.log(err);
    })
  }

  async setJWTCookie(user, res) {
    const tokenObject = utils.issueJWT(user._id, aud.pending);
    let options = {
      sameSite: 'None', secure: true,
      maxAge: 1000000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
    }

    const session = this.driver.session()
    try {
      const respo = await session.writeTransaction(async tx => {
        const res1 = await tx.run(`
        MATCH (u: User {_id:$id}) 
        set u.token = $token
        set u.expires = $expires
        RETURN u
        `, { id:user._id, token:tokenObject.token,expires: tokenObject.expires });
        res.cookie('jwt', tokenObject.token, options).status(200).json({ success: true, user: { email: user.email } });
      })
    } catch (e) {
      console.log(e);
      res.json({ success: false, message: e.message })

    }

  }

  userToClaims(user) {
    const { name, userId } = user

    return { sub: userId, userId, name }
  }

  async claimsToUser(claims) {
    return {
      ...claims,
      userId: claims.sub,
    }
  }
}

// let auth = new AuthService();
// auth.createUser();

module.exports.AuthService = AuthService;