// Packages
import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Masonry from "react-masonry-css";
import Link from "next/link";

// Context
import { ContentsContext } from "@/context/Contents";

// Firebase
import { db } from "@/utils/firebase/Firebase";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

// Components
import { Hero, Information, Buying, Testimonial, Contents } from "@/components";
import { Container, HeadingText } from "@/components";

// Fonts
import { DM_Sans } from "@next/font/google";

const dm_sans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Types
import { TestimonialTypes } from "@/types/Testimonial";

export default function Home() {
  const [testimonials, setTestimonials] = useState<TestimonialTypes>([]);
  // const [isContentOpen, setIsContentOpen] = useState<boolean>(false);

  const { isContentOpen } = useContext(ContentsContext);

  useEffect(() => {
    const colRef = collection(db, "testimonial");
    const q = query(colRef, orderBy("order"), where("homePage", "==", true));

    const gettingTestimonial = async () => {
      const testimonials = await getDocs(q);
      const snapshot: any = testimonials.docs.map((messages) => ({
        ...messages.data(),
        id: messages.id,
      }));
      setTestimonials(snapshot);
    };

    gettingTestimonial();
  }, []);

  useEffect(() => {
    isContentOpen
      ? (document.documentElement.style.overflow = "hidden")
      : (document.documentElement.style.overflow = "auto");
  }, [isContentOpen]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    768: 1,
  };

  return (
    <>
      <Head>
        <title>AniLearn | Animation Content</title>
        <meta
          name="description"
          content="Learning something with animation
doesn't get easier than this"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className={dm_sans.className}>
        <Hero />
        <Information />
        <Buying />
        <Container className="relative py-24 px-4 md:px-8">
          <HeadingText className="text-3xl md:text-4xl font-bold leading-[1.5] md:leading-[1.4] my-3 mb-8">
            What people have been saying
          </HeadingText>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {testimonials.map((testimonial) => (
              <Testimonial key={testimonial.name} data={testimonial} />
            ))}
          </Masonry>
          <div className="w-full h-3/5 bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 flex justify-center items-end pb-36">
            <Link
              href={"/testimonial"}
              className="inline-block bg-black text-white py-2 px-8 rounded-md shadow-button"
            >
              Read More
            </Link>
          </div>
        </Container>

        {isContentOpen && <Contents />}
      </main>
    </>
  );
}
