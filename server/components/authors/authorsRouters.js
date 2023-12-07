import  Router  from "express";
import authorsControllers from "../authors/authorsControllers.js";

const router = new Router();

router.get("/", authorsControllers.getAll);
router.get("/:id", authorsControllers.getOne);
router.post("/", authorsControllers.create);
router.put("/:id", authorsControllers.update);
router.delete("/:id", authorsControllers.destroy);

export default router;