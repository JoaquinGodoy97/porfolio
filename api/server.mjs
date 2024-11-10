import express from 'express';
import {getRepoList} from './fetchRepo.mjs'
// import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {

    try{
        console.log('Starting fetch process...');
        const repoData = await getRepoList();

        if (!repoData) {
            console.error('No data returned from getRepoList');
            return res.status(500).json({ error: 'No data received' });
        }

        res.json(repoData);
    } catch (err) {
        res.status(500).send(err.message)
    }
}); 

// if (process.env.NODE_ENV !== 'production' || !process.env.NODE_ENV) { 
    app.listen(PORT, '0.0.0.0', () => { 
        console.log(`Server running on http://localhost:${PORT}`); 
    });
// }

// export default serverless(app, {
//     basePath: '/api'  // Optional: Set a base path if needed
// });