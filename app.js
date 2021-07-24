const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = 4200;
const options = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

try {
    mongoose.connect('mongodb://localhost:27017/wikiDB', options);
} catch (err) {
    console.error(err);
}

const articleSchema = {
    title: {
        type: String,
        required: [true, 'A title was not provided.']
    },
    content: {
        type: String,
        required: [true, 'Content is missing.']
    }
};

const Article = mongoose.model('Article', articleSchema);

app.route('/articles')

    //////////////////////////// REQUESTS TARGETING ALL ARTICLES ////////////////////////////////////////

    .get(((req, res) => {
        Article.find((err, articles) => {
            if (!err) {
                res.render('test', {articlesToPost: articles});
            } else {
                res.send(err);
            }
        });
    }))

    .post(((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err => {
            if (!err) {
                res.send('Successfully added new article');
            } else {
                res.send(err);
            }
        }));
    }))

    .delete(((req, res) => {
        Article.deleteMany((err => {
            if (!err) {
                res.send('Successfully deleted all articles');
            } else {
                res.send(err);
            }
        }));
    }));

//////////////////////////// REQUESTS TARGETING A SPECIFIC ARTICLE  ////////////////////////////////////////

app.route('/articles/:articleTitle')

    .get((req, res) => {
        Article.findOne({title: req.params.articleTitle},
            {},
            {},
            (err, foundArticle) => {
                if (!err && foundArticle) {
                    res.send(foundArticle);
                } else if (err) {
                    res.send('An error occurred.');
                } else if (!foundArticle) {
                    res.send('No article found.');
                } else {
                    res.send('Something went wrong.');
                }
            });
    })

    .put(((req, res) => {
        Article.updateOne(
            // query filter
            {title: req.params.articleTitle},
            // fields to update
            {title: req.body.title, content: req.body.content},
            {},
            (err) => {
                if (!err) {
                    res.send('Successfully updated article.')
                } else {
                    res.send('Something went wrong during article update.')
                }
            });
    }))

    .patch(((req, res) => {
        /*
            patch request body to dynamically handle the request, use case coverage:
            - the title might not be specified.
            - the content might not be specified.
            - Both title and content could be specified.
         */
        const updateBody = req.body;
        Article.updateOne(
            {title: req.params.articleTitle},
            updateBody,
            (err) => {
                if (!err) {
                    res.send('Successfully updated article.')
                } else {
                    res.send('Something went wrong during article update.')
                }
            })
    }))

    .delete(((req, res) => {
        Article.deleteOne({title: req.params.articleTitle}, (err => {
            if (!err) {
                res.send('Successfully deleted article');
            } else {
                res.send('Something went wrong during article deletion.');
            }
        }));
    }));

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
});