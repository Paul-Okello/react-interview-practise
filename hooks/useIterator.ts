import { useEffect, useState } from "react"

type User = {
    name: string
    picture: string
    gender?: string
    email?: string
    phone?: string
}

type APIReturn = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: number;
        coordinates: {
            latitude: string;
            longitude: string;
        };
        timezone: {
            offset: string;
            description: string;
        };
    };
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    };
    dob: {
        date: string;
        age: number;
    };
    registered: {
        date: string;
        age: number;
    };
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    nat: string;
};



export function useIterator(url: string): {
    users: User[];
    currentIndex: number;
    isLoading: boolean;
    next: () => void;
    previous: () => void;
    goToUser: (index: number) => void;
} {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function fetchUsers() {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        const fineData = data.results as APIReturn[];
        const {
            name: { first, last },
            picture: { thumbnail },
            gender,
            email,
            phone
        } = fineData[0];

        setUsers([...users, { name: `${first} ${last}`, picture: thumbnail, gender, email, phone }]);
        if (users.length === 0) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(users.length);
        }
        setIsLoading(false);
    }

    function next() {
        if (currentIndex < users.length - 1) {
            // If there is another user in the list, move to the next one
            setCurrentIndex(currentIndex + 1);
        } else {
            // If there are no more users in the current list, fetch more
            fetchUsers();
        }
    }

    function previous() {
        if (currentIndex > 0) {
            // If there is a user before the current one, move to the previous one
            setCurrentIndex(currentIndex - 1);
        }
    }

    function goToUser(index: number) {
        if (index >= 0 && index < users.length) {
            // Check if the provided index is within the valid range
            setCurrentIndex(index);
        }
    }

    // Use useEffect to fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users,
        currentIndex,
        isLoading,
        next,
        previous,
        goToUser,
    };
}