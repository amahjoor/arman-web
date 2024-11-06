'use client';

import PageLayout from '@/components/PageLayout';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useState } from 'react';

interface Book {
  title: string;
  author: string;
  status: 'current' | 'past' | 'tbr';
  genres: string[];
  link?: string;
  review?: string;
}

const books: Book[] = [
  // Current Reads
  {
    title: "Successful Algorithmic Trading",
    author: "Michael Halls-Moore",
    status: "current",
    genres: ["Finance", "Programming", "Trading", "Quantitative Analysis"],
    link: "https://www.quantstart.com/successful-algorithmic-trading-ebook/",
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    status: "current",
    genres: ["Psychology", "Self-Help"],
    link: "https://www.amazon.com/Power-Habit-What-Life-Business/dp/081298160X"
  },
  {
    title: "Hit Refresh",
    author: "Satya Nadella",
    status: "current",
    genres: ["Business", "Technology", "Memoir"],
    link: "https://www.amazon.com/Hit-Refresh-Rediscover-Microsofts-Everyone/dp/0062652508"
  },
  {
    title: "Getting Things Done",
    author: "David Allen",
    status: "current",
    genres: ["Productivity", "Business"],
    link: "https://www.amazon.com/Getting-Things-Done-Stress-Free-Productivity/dp/0143126563"
  },
  // Past Reads
  {
    title: "Deep Work",
    author: "Cal Newport",
    status: "past",
    genres: ["Productivity", "Self-Help"],
    link: "https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692"
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    status: "past",
    genres: ["Self-Help", "Psychology", "Business"],
    link: "https://www.amazon.com/How-Win-Friends-Influence-People/dp/0671027034"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    status: "past",
    genres: ["Finance", "Personal Development"],
    link: "https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "past",
    genres: ["Fiction", "Philosophy"],
    link: "https://www.amazon.com/Alchemist-Paulo-Coelho/dp/0062315005"
  },
  {
    title: "The Fifth Vital",
    author: "Mike Majlak",
    status: "past",
    genres: ["Memoir", "Self-Help"],
    link: "https://www.amazon.com/Fifth-Vital-Mike-Majlak/dp/1734174160"
  },
  {
    title: "Modern Korean Fiction - An Anthology",
    author: "Bruce Fulton",
    status: "past",
    genres: ["Fiction", "Korean Literature"],
    link: "https://www.amazon.com/Modern-Korean-Fiction-Anthology-Bruce/dp/0231135122"
  },
  {
    title: "Yi Kwang-su and Modern Korean Literature: Mujong",
    author: "Ann Sung-hi Lee",
    status: "past",
    genres: ["Literary Criticism", "Korean Literature"],
    link: "https://www.amazon.com/Yi-Kwang-su-Modern-Korean-Literature/dp/0231123116"
  },
  {
    title: "Way of the Wolf",
    author: "Jordan Belfort",
    status: "past",
    genres: ["Business", "Sales"],
    link: "https://www.amazon.com/Way-Wolf-Straight-Line-Selling/dp/1501164287"
  },
  {
    title: "See You at the Top",
    author: "Zig Ziglar",
    status: "past",
    genres: ["Self-Help", "Motivation"],
    link: "https://www.amazon.com/See-You-Top-Zig-Ziglar/dp/1565547063"
  },

  // To Be Read
  {
    title: "Stochastic Calculus for Finance I: The Binomial Asset Pricing Model",
    author: "Steven E. Shreve",
    status: "tbr",
    genres: ["Finance", "Mathematics", "Quantitative Finance"],
    link: "https://www.amazon.com/Stochastic-Calculus-Finance-Binomial-Springer/dp/0387249680",
  },
  {
    title: "Stochastic Calculus for Finance II: Continuous-Time Models",
    author: "Steven E. Shreve",
    status: "tbr",
    genres: ["Finance", "Mathematics", "Quantitative Finance"],
    link: "https://www.amazon.com/Stochastic-Calculus-Finance-II-Continuous-Time/dp/144192311X",
  },
  {
    title: "1984",
    author: "George Orwell",
    status: "tbr",
    genres: ["Fiction", "Dystopian"],
    link: "https://www.amazon.com/1984-Signet-Classics-George-Orwell/dp/0451524934"
  },
  {
    title: "Rich Dad's Cashflow Quadrant",
    author: "Robert Kiyosaki",
    status: "tbr",
    genres: ["Finance", "Business"],
    link: "https://www.amazon.com/Rich-Dads-CASHFLOW-Quadrant-Financial/dp/1612680054"
  },
  {
    title: "Rich Dad's Guide to Investing",
    author: "Robert Kiyosaki",
    status: "tbr",
    genres: ["Finance", "Investing"],
    link: "https://www.amazon.com/Rich-Dads-Guide-Investing-Investing/dp/1612680208"
  },
  {
    title: "The 4 Hour Work Week",
    author: "Timothy Ferriss",
    status: "tbr",
    genres: ["Business", "Productivity", "Lifestyle"],
    link: "https://www.amazon.com/4-Hour-Work-Week-Escape-Anywhere/dp/0307465357"
  },
  {
    title: "48 Laws of Power",
    author: "Robert Greene",
    status: "tbr",
    genres: ["Psychology", "Self-Help", "History"],
    link: "https://www.amazon.com/48-Laws-Power-Robert-Greene/dp/0140280197"
  },
  {
    title: "How to Stop Worrying and Start Living",
    author: "Dale Carnegie",
    status: "tbr",
    genres: ["Self-Help", "Psychology"],
    link: "https://www.amazon.com/How-Stop-Worrying-Start-Living/dp/0671733354"
  }
];

const allGenres = Array.from(
  new Set(books.flatMap(book => book.genres))
).sort();

const statusLabels = {
  current: "Currently Reading",
  past: "Finished",
  tbr: "To Be Read"
};

const statusColors = {
  current: "bg-green-900/50 text-green-300",
  past: "bg-blue-900/50 text-blue-300",
  tbr: "bg-yellow-900/50 text-yellow-300"
};

export default function Books() {
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const filteredBooks = books.filter(book => {
    const matchesStatus = selectedStatus.length === 0 || selectedStatus.includes(book.status);
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => book.genres.includes(genre));
    return matchesStatus && matchesGenres;
  });

  return (
    <>
      <Navbar />
      <PageLayout>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 opacity-0 animate-fade-in">Books</h1>
          
          {/* Status Filter */}
          <div className="mb-8 opacity-0 animate-fade-in-delay">
            <h2 className="text-lg font-semibold mb-3">Reading Status</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusLabels).map(([status, label]) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(prev => 
                    prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
                  )}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedStatus.includes(status)
                      ? statusColors[status as keyof typeof statusColors]
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="mb-8 opacity-0 animate-fade-in-delay">
            <h2 className="text-lg font-semibold mb-3">Genre</h2>
            <div className="flex flex-wrap gap-2">
              {allGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenres(prev => 
                    prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
                  )}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedGenres.includes(genre)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-0 animate-fade-in-delay-2">
            {filteredBooks.map((book, index) => (
              <BookCard key={index} book={book} />
            ))}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

function BookCard({ book }: { book: Book }) {
  return (
    <div className="group bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-all duration-300 h-full">
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-bold">{book.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${statusColors[book.status]}`}>
            {statusLabels[book.status]}
          </span>
        </div>
        <p className="text-gray-400 mt-2">by {book.author}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {book.genres.map((genre, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300"
          >
            {genre}
          </span>
        ))}
      </div>

      {book.link && (
        <Link 
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-purple-400 hover:text-purple-300 text-sm"
        >
          View Book →
        </Link>
      )}
    </div>
  );
}