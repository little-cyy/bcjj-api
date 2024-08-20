const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
require("dotenv").config();
const adminAuth = require("./middlewares/adminAuth");
const userAuth = require("./middlewares/userAuth");

//#region 前台路由文件
const indexRouter = require("./routes/index");
const categoriesRouter = require("./routes/categories");
const coursesRouter = require("./routes/courses");
const chaptersRouter = require("./routes/chapters");
const articlesRouter = require("./routes/articles");
const usersRouter = require("./routes/users");
const searchRouter = require("./routes/search");
const authRouter = require("./routes/auth");
const likesRouter = require("./routes/likes");
//endregion

//#region 后台路由文件
const adminArticlesRouter = require("./routes/admin/articles");
const adminCategoriesRouter = require("./routes/admin/categories");
const adminSettingsRouter = require("./routes/admin/settings");
const adminUsersRouter = require("./routes/admin/users");
const adminUserBasedRouter = require("./routes/admin/userbased");
const adminCoursesRouter = require("./routes/admin/courses");
const adminChaptersRouter = require("./routes/admin/chapters");
const adminChartsRouter = require("./routes/admin/charts");
const adminAuthRouter = require("./routes/admin/auth");
const adminMenusRouter = require("./routes/admin/menus");
const admindictionariesRouter = require("./routes/admin/dictionaries");
const adminRolesRouter = require("./routes/admin/roles");
//endregion

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//#region 前台路由配置
app.use("/", indexRouter);
app.use("/categories", categoriesRouter);
app.use("/courses", coursesRouter);
app.use("/chapters", chaptersRouter);
app.use("/articles", articlesRouter);
app.use("/search", searchRouter);
app.use("/auth", authRouter);
app.use("/users", userAuth, usersRouter);
app.use("/likes", userAuth, likesRouter);
//#endregion

//#region 后台路由配置
app.use("/admin/articles", adminAuth, adminArticlesRouter);
app.use("/admin/categories", adminAuth, adminCategoriesRouter);
app.use("/admin/settings", adminAuth, adminSettingsRouter);
app.use("/admin/users", adminAuth, adminUsersRouter);
app.use("/admin/userbased", adminAuth, adminUserBasedRouter);
app.use("/admin/courses", adminAuth, adminCoursesRouter);
app.use("/admin/chapters", adminAuth, adminChaptersRouter);
app.use("/admin/charts", adminAuth, adminChartsRouter);
app.use("/admin/auth", adminAuthRouter);
app.use("/admin/menus", adminAuth, adminMenusRouter);
app.use("/admin/dictionaries", adminAuth, admindictionariesRouter);
app.use("/admin/roles", adminAuth, adminRolesRouter);
//#endregion

module.exports = app;
