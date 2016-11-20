import { Router } from 'express';
import fs from 'fs';

let router = new Router();

import IndexPage from '../controllers/index';


/**
 * 首页请求
 */
router.get('/', IndexPage);


/**
 * 静态资源
 */
let content = fs.readFileSync(__dirname + '/../../client/js/utils/sw.js', 'utf8');

router.get('/sw.js', async function(req, res){
    res.set('Content-Type', 'application/javascript');
    res.send(content);
});

export default router;
