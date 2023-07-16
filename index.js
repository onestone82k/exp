let express = require('express');
let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const { swaggerUi, specs } = require("./swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

const users =[
    {id:1, name:"유저1"},
    {id:2, name:"유저2"},
    {id:3, name:"유저3"},    
];

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */
app.get('/',(req, res)=>{
    res.send("Hello World!");
});

/**
 * @swagger
 * paths:
 *  /api/user/users:
 *    get:
 *      summary: "유저 데이터 전체조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Users]
 *      responses:
 *        "200":
 *          description: 전체 유저 정보
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    users:
 *                      type: object
 *                      example:
 *                          [
 *                            { "id": 1, "name": "유저1" },
 *                            { "id": 2, "name": "유저2" },
 *                            { "id": 3, "name": "유저3" },
 *                          ]
 */
app.get('/users',(req, res)=>{
    res.json({ok:true, users:users});
});
//query string id
app.get('/users/user',(req, res)=>{
    const userId = req.query.userId;
    const user = users.filter(data=> data.id == userId);
    res.json({ok:false, user:user});
})
//post man 에서 테스트해야함
app.get('users/userBody',(req, res)=>{
    const userId = req.body.userId;
    const user = users.filter(data=> data.id == userId);
    res.json({ok:false, user:user});
});

app.get('/users/:userId', (req,res)=>{
    const userId = req.params.userId;
    const user = users.filter(data=>data.id==userId);
    console.log(user.length);
    let result = (user.length!=0) ? {ok:true, 'user':user} : {ok:false};
    res.json(result);
})
app.listen(3000, ()=>{
    console.log("server is strning...");
});