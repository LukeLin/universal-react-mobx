import { Router } from 'express';
import fs from 'fs';

let router = new Router();

import IndexPage from '../controllers/index';
import Todo from '../controllers/Todo';


/**
 * 首页请求
 */
router.get('/', IndexPage);
router.get('/todo', Todo);


/**
 * 静态资源
 */
let content = fs.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');

router.get('/sw.js', async function(req, res){
    res.set('Content-Type', 'application/javascript');
    res.send(content);
});

export default router;
