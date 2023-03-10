// Packages
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Masonry from "react-masonry-css";

// Firebase
import { db } from "@/utils/firebase/Firebase";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";

// Components
import { Container, HeadingText, Testimonial, Skeleton } from "@/components";
import HeadTags from "@/layouts/Head";

// Icons
import { BsJournalText } from "react-icons/bs";

// Types
type Props = {};
import { TestimonialTypes } from "@/types/Testimonial";

export default function TestimonialPage({}: Props) {
  const [testimonials, setTestimonials] = useState<TestimonialTypes>([]);
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    const colRef = collection(db, "testimonial");
    const q = query(
      colRef,
      orderBy("order"),
      where("testimonialPage", "==", true)
    );
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
    setTimeout(() => {
      setIsShown(true);
      setTimeout(() => {
        setIsShown(false);
      }, 5000);
    }, 2000);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    768: 1,
  };

  return (
    <>
      <HeadTags
        title="Testimonial"
        banner="https://i.ibb.co/7J8JWLf/Testimonial.png"
        description="What people have been saying"
      />
      <div className="px-4 md:px-8">
        <HeadingText className="mt-24 mb-12 text-4xl font-black text-center sm:text-5xl md:text-7xl">
          Testimonials
        </HeadingText>
        {testimonials.length == 0 ? (
          <Skeleton type="testimonial" />
        ) : (
          <Container>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {testimonials.map((testimonial) => (
                <Testimonial key={testimonial.order} data={testimonial} />
              ))}
            </Masonry>
          </Container>
        )}
        <Link
          href={"/adding-testimonial"}
          className="fixed p-3 text-2xl text-white bg-black rounded-full bottom-4 right-4"
        >
          {isShown && (
            <p className="absolute right-0 top-[-50px] bg-black text-white py-2 px-4 rounded-lg whitespace-nowrap text-base animate-bounce">
              Add a <span className="font-bold">Testimonial</span> here
            </p>
          )}
          <BsJournalText />
        </Link>
      </div>
    </>
  );
}
