'use client';
import { useEffect, useState } from 'react';
import styles from './TableOfContent.module.css';

const asideList = [
  'My Story',
  'Priming',
  'Enter Framer',
  'For the no-coders. Framer is for you.',
  'For the code-savvy. Framer is for you.',
  'My Sweet Spot: How Our Team is Using Framer',
  'Figma',
  'My Framer Desktop',
  'Tight Developer Schedule',
];

export default function TableOfContentPage() {
  const [selected, setSelected] = useState(0); // Kezdetben az első menüpont legyen kiválasztva

  useEffect(() => {
    // Görgetés figyelése
    const handleScroll = () => {
      const sections = asideList.map((_, index) =>
        document.getElementById(index.toString())
      );
      let currentSection = -1;

      // Loop through sections and find which is in the viewport
      sections.forEach((section, index) => {
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight / 2 &&
          section.getBoundingClientRect().bottom >= window.innerHeight / 2
        ) {
          currentSection = index;
        }
      });

      if (currentSection !== -1) {
        setSelected(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleItemClick = (index) => {
    setSelected(index);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <aside className={styles.aside}>
          <div>
            <div className={styles.tableOfContents}>Table of Contents</div>
            <ul>
              {asideList.map((item, index) => (
                <li
                  key={index}
                  className={index === selected ? styles.selected : ''}
                >
                  <a href={`#${index}`} onClick={() => handleItemClick(index)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className={styles.main}>
          <h1>Framer is still alive and well… and it’s a game-changer</h1>
          <h2>A love letter to my prototyping tool of choice.</h2>

          <p>
            Earlier, this week, this post came across my feed:{' '}
            <a
              href='https://azumbrunnen.me/blog/framer-is-dead/'
              target='_blank'
            >
              “Framer is Dead.”
            </a>
          </p>
          <p>
            <em>Impossible.</em> I've been using it non-stop for the past month.
          </p>
          <p>
            Sadly, this post has gotten some traction, and I've seen it pop-up
            on several round-ups.
          </p>
          <p>
            Two weeks ago, Framer launched{' '}
            <strong>a new home page design and Smart Components</strong>, with
            <strong>Variants</strong> coming out of Beta. Looking at new
            features alone, it's very much alive and well.
          </p>
          <p>
            The leading case this post made was that Framer was at fault for
            moving toward React. In doing so, it's alienating designers that
            aren't code-savvy. Or, on the opposite end of the spectrum,
            over-empowering UX engineers who over-value the code.
          </p>
          <p>
            Then, as if to drive the nail in the coffin: “Framer used to be
            about playing around. Now it's about building things.” — Frankly,
            I'm not sure why “playing around” and “building things” have to be
            mutually exclusive.
          </p>
          <p>Are we talking about the same product?</p>

          <h3 id='0'>My Story</h3>

          <p>
            Before Framer, we were using{' '}
            <a href='http://invision.com' target='_blank'>
              Invision
            </a>{' '}
            for prototyping. At best, this experience felt clunky. I was taking
            static images, creating hot spots, and linking them together. If
            anything, it demonstrated how screens were linked together. But,
            during pitches, there was still a considerable amount of hand waving
            and, “Imagine this. The user will scroll down, and this will
            happen…”
          </p>

          <p>
            While this worked for some clients, others still had trouble making
            that leap, however big or small. There was even a fair amount of
            redesigning once developers got involved. “Oh, I didn't realize
            that's what you meant.”
          </p>

          <h3 id='1'>Priming</h3>

          <div className={styles.imageTextWrapper}>
            <div className={styles.imageTextWrapper__image}>
              <img src='/design-details.jpeg' alt='Design Details' />
            </div>

            <div className={styles.imageTextWrapper__content}>
              <p>
                In November (2020), I started working with a new client,
                designing a native application. About the same time, I was
                listening to the{' '}
                <a
                  href='https://designdetails.fm/episodes/h5VhO2W3'
                  target='_blank'
                >
                  Design Details Podcast, Episode 377: Future-Proof Designer
                </a>
                . One of the skills they talked about was prototyping.{' '}
                <strong>
                  The best designers at prototyping are the best communicators.
                </strong>
              </p>
            </div>
          </div>

          <blockquote className={styles.quote}>
            The best designers at prototyping are the best communicators.
          </blockquote>

          <p>Noted.</p>

          <p>
            At that moment, I knew that the most effective way to get
            stakeholders on board was to create a prototype true to the app's
            experience.
          </p>
          <p>
            That's the key: <strong>an app is an experience.</strong>
          </p>

          <p>
            When you're designing a native application, you're pushing pixels on
            a laptop or a desktop. The point is: it's a different medium; it's a
            different device than how the end-user will experience the final
            product.
          </p>
          <p>
            I wanted to create a prototype that felt real. They could pull it up
            on their mobile device and feel like they were using an application
            — no smoke and mirrors. No handwaving. No magic.
          </p>

          <h3 id='2'>Enter Framer</h3>

          <p>
            I've known about Framer for years but never explored it as an
            option. This project seemed like the perfect opportunity and the
            perfect fit.
          </p>

          <p>I've been blown away.</p>

          <h3 id='3'>For the no-coders. Framer is for you.</h3>

          <p>
            You can import your designs directly from Figma or Sketch or design
            directly within Framer.
          </p>
          <p>
            It has plenty of built-in, interactive components that you can use
            to build a prototype without writing a line of code.
          </p>

          <div className={styles.image}>
            <img src='/framer-insert-menu.png' alt='Framer Insert Menu' />
            <h4 className={styles.caption}>Insert Menu within Framer</h4>
          </div>

          <p>
            There’s an entire library of third-party components, at your
            disposal.
          </p>

          <div className={styles.image}>
            <img
              src='/framer-community-plugins.gif'
              alt='Framer Community Plugins'
            />
            <h4>Framer Community Plugins</h4>
          </div>

          <p>
            With the release of{' '}
            <a
              href='https://www.framer.com/blog/posts/5-interactive-components-with-variants/'
              target='_blank'
            >
              Variants
            </a>
            and{' '}
            <a
              href='https://www.framer.com/blog/posts/announcing-smart-components/'
              target='_blank'
            >
              Smart Components
            </a>
            , the sky’s the limit.
          </p>

          <div className={styles.image}>
            <img
              src='/framer-smart-components.gif'
              alt='Framer Smart Components'
            />
          </div>

          <h3 id='4'>For the code-savvy. Framer is for you.</h3>

          <p>
            In Framer, you can code custom React components(!!) and use them
            alongside designed components. This is mind-blowing to me.
          </p>

          <blockquote className={styles.quote}>
            I can play with interactions while building something real.
          </blockquote>

          <p>The sky truly is the limit.</p>

          <h3 id='5'>My Sweet Spot: How Our Team is Using Framer</h3>

          <p>
            I recognize that my skill set is different. I design and write code.
            Not all designers code, and not all developers design — and that’s
            perfectly fine. I’ve found Framer blends both worlds in a way that
            I’ve never seen in an application.
          </p>

          <h3 id='6'>Figma</h3>

          <p>
            I’ve done all the initial design work within Figma. I have more
            experience there, and it’s allowed me to create multiple drafts and
            experiment in design without muddying my prototype in Framer.
          </p>

          <div className={styles.imageTextWrapper}>
            <div className={styles.imageTextWrapper__image}>
              <img src='/figma-sidebar.png' alt='Figma Sidebar' />
            </div>

            <div className={styles.imageTextWrapper__content}>
              <p>
                Once the design is cleaned up, I have a page in Figma that I use
                specifically for a hand-off. This keeps unwanted elements out of
                Framer
              </p>
            </div>
          </div>

          <h3 id='7'>Framer Desktop</h3>

          <p>
            You can do everything within the browser, through Framer Web. In
            fact, Framer Web has more features than Framer Desktop.
          </p>
          <p>
            However, with Framer Desktop, I can directly access the code folder.
            Meaning, I can write custom React components within{' '}
            <strong>VS Code</strong>, my choice IDE.
          </p>
          <p>
            I also have access to the <strong>package.json</strong> file to
            install npm packages, like any other project. This only extends my
            toolset, giving me access to packages like{' '}
            <a href='https://styled-components.com/' target='_blank'>
              Styled Components
            </a>{' '}
            and{' '}
            <a href='https://date-fns.org/' target='_blank'>
              date-fns
            </a>
            .
          </p>
          <p>
            All code is committed to <strong>version control</strong>, either{' '}
            <a href='http://github.com/' target='_blank'>
              GitHub
            </a>{' '}
            or{' '}
            <a href='https://bitbucket.org/' target='_blank'>
              BitBucket
            </a>
            . This creates a better workflow for me, but also gives easy access
            to the engineers on the project.
          </p>

          <h4>JSON Data Files</h4>

          <p>
            I’ve created JSON files that outline the data. The state of the app
            and its design change based on the data passed in.
          </p>

          <p>
            What does it look like to have 1 notification vs. 12? What happens
            when the user has overdue payments? What does the app look like when
            the user is in Phase 1 vs. Phase 3 of the program? Instead of
            creating prototypes for each use case, I update the data passed in.
          </p>

          <p>
            We can always change the shape of the data in my JSON file, but it
            does have the potential to mirror a potential GraphQL query.
          </p>

          <h4>Sharing the Project</h4>

          <p>
            Once I have a working prototype, I’ll upload the project to{' '}
            <strong>Framer Web</strong>. This makes it easy to generate share
            links. Even better, if someone has the{' '}
            <a href='#' target='_blank'>
              Framer Preview App
            </a>{' '}
            on their mobile device, I can generate a QR Code that allows them to
            interact with the prototype on their phone, just like the final
            native app.
          </p>

          <div className={styles.image}>
            <img src='/framer-qr-code.png' alt='Framer QR Code' />
            <h4>Generating a QR Code for Framer Preview App</h4>
          </div>

          <h3 id='8'>Tight Developer Schedule</h3>

          <p>
            As with most projects, this one has a tight developer schedule. One
            of the biggest perks that we’ve found is that Framer has gotten us
            to the end result faster. I’m able to hand over the React components
            I’ve created with minimal refactoring.
          </p>

          <p>
            While this process might sound more like <em>building</em> instead
            of <em>experimenting</em>, I didn’t list in detail all the “play”
            that is woven throughout the entire process.
          </p>

          <p className={styles.last}>Framer is very much alive and well.</p>
        </main>
      </div>
    </div>
  );
}
