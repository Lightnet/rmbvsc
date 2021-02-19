/**
 * Project Name: unknown
 * Created by: Lightnet
 * License: CC BY-ND 2.0
 * 
 * Information: Helper to auth checks token and others.
 */


/**
 * Top level Checks Access for token check for user
 */
export async function authenticate(req, res, next) {
  //console.log(req.path);
  //console.log(req.session);
  let token = req.session.token;
  //console.log("token:", token);
  if (!token) return (res.statusCode=401,res.end('No token!'));
  //console.log( token);
  //req.user = await Users.find(token); // <== fake
  next(); // done, woot!
}