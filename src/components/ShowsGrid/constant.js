const movieModes = [
    {
        id: 0,
        name: 'popular',
        isToggleOn: false,
        slug: 'popular',
        url: "/movie"
    },
    {
        id: 1,
        name: 'now playing',
        isToggleOn: false,
        slug: 'now_playing',
        url: "/movie/now_playing"
    },
    {
        id: 2,
        name: 'upcoming',
        isToggleOn: false,
        slug: 'upcoming',
        url: "/movie/upcoming"
    },
    {
        id: 3,
        name: 'top rated',
        isToggleOn: false,
        slug: 'top_rated',
        url: "/movie/top_rated"
    }
]

const tvModes = [
    {
        id: 0,
        name: 'popular',
        isToggleOn: false,
        slug: 'popular'
    },
    {
        id: 1,
        name: 'airing today',
        isToggleOn: false,
        slug: 'airing_today'
    },
    {
        id: 2,
        name: 'on tv',
        isToggleOn: false,
        slug: 'on_the_air'
    },
    {
        id: 3,
        name: 'top rated',
        isToggleOn: false,
        slug: 'top_rated'
    }
]

const showTypeModes = [
    {
        id:0,
        name: 'movie',
        isToggleOn: false,
        slug: 'movie'
    },
    {
        id:1,
        name: 'tv',
        isToggleOn: false,
        slug: 'tv'
    }
]
export {
    movieModes,
    tvModes,
    showTypeModes
}
