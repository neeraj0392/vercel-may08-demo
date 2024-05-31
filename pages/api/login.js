import { data } from "@/data";
import { withSession } from "@/session";

export async function handler(req, res) {
  const { username, password } = req.body;

  const user = data.find((item) => item.username == username);

  if (user && user.password == password) {
    req.session.set("user", user);
    await req.session.save(); /// cookie will get created;
    res.status(200).json({ message: "user authenticated" });
  } else {
    res.status(403).json({ message: "username or password is wrong" });
  }
}

export default withSession(handler);
