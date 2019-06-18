import React from "react";
import ImageSlider from "@components/slider/ImageSlider";
import Paper from "@material-ui/core/Paper";

class Home extends React.Component {
    render() {
        return (
            <>
                <Paper className="home__slider">
                    <ImageSlider
                        images={
                            [
                                "https://trainpix.org/photo/01/48/73/148737.jpg",
                                "https://trainpix.org/photo/02/29/82/229820.jpg",
                                "http://transphoto.ru/photo/12/24/01/1224013.jpg",
                                "http://transphoto.ru/photo/12/23/69/1223691.jpg",
                                "https://trainpix.org/photo/02/31/63/231636.jpg",
                                "http://transphoto.ru/photo/12/08/03/1208031.jpg",
                                "https://trainpix.org/photo/02/27/45/227454.jpg"
                            ]
                        }
                    />
                </Paper>
                <h1 className="heading home__heading">
                    Welcome to the Photography Portfolios!
                </h1>
                <p className="home__text">
                    Here you can find many photographies, and order them here! Just navigate
                    throuhout our site and you can find many amazing things. Just keep calm
                    and relax :)
                </p>
                <p className="home__text">
                    Galleries have multiple roles, both visible and invisible: to incubate and
                    support their artists, often by going above and beyond the normal work of
                    putting on shows, promoting their artists, and selling the works; and to
                    providing services such as financial management or book publishing, in order
                    to help their artists focus more fully on their work.
                </p>
                <p className="home__text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Nec tincidunt praesent
                    semper feugiat. Venenatis a condimentum vitae sapien pellentesque. At lectus
                    urna duis convallis. Venenatis lectus magna fringilla urna porttitor rhoncus
                    dolor purus non. Libero justo laoreet sit amet cursus. Porttitor leo a diam
                    sollicitudin tempor id. Quis eleifend quam adipiscing vitae. Curabitur vitae
                    nunc sed velit dignissim sodales ut. Eu tincidunt tortor aliquam nulla
                    facilisi cras fermentum. Nulla facilisi etiam dignissim diam.
                </p>
            </>
        );
    }
}

export default Home;
