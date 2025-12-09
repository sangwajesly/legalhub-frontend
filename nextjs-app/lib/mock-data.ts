import { Article, Lawyer } from '@/types';

export const DUMMY_ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Understanding Land Rights and Property Ownership in Cameroon',
        content: 'Land ownership in Cameroon involves both customary and statutory law...',
        author: {
            id: 'l1',
            name: 'Amina Nkrumah',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
        },
        category: 'Real Estate',
        tags: ['Land Rights', 'Property', 'Cameroon Law'],
        likes: 245,
        commentCount: 67,
        views: 2105,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        id: '2',
        title: 'Tenant Rights in Lagos: What Every Renter Should Know',
        content: 'Before signing a tenancy agreement in Lagos, understand your rights under Nigerian law...',
        author: {
            id: 'l2',
            name: 'Chidi Okafor',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
        },
        category: 'Real Estate',
        tags: ['Tenancy', 'Lagos', 'Housing Law'],
        likes: 189,
        commentCount: 43,
        views: 1850,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
        id: '3',
        title: 'Starting a Business in Ghana: Legal Requirements and Registration',
        content: 'Launching a business in Ghana requires understanding the Registrar General\'s Department procedures...',
        author: {
            id: 'l3',
            name: 'Kwame Mensah',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
        },
        category: 'Business',
        tags: ['Business Registration', 'Ghana', 'Startups'],
        likes: 312,
        commentCount: 89,
        views: 3200,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
        id: '4',
        title: 'Employment Law in Burkina Faso: Worker Rights and Protections',
        content: 'The Labour Code of Burkina Faso provides comprehensive protections for workers...',
        author: {
            id: 'l4',
            name: 'Fatou Diallo',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
        },
        category: 'Employment',
        tags: ['Employment', 'Worker Rights', 'Burkina Faso'],
        likes: 156,
        commentCount: 34,
        views: 1420,
        createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    },
    {
        id: '5',
        title: 'Family Law in West Africa: Marriage, Divorce, and Inheritance',
        content: 'Family law across West African nations balances customary and statutory provisions...',
        author: {
            id: 'l5',
            name: 'Ibrahim Touré',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
        },
        category: 'Family Law',
        tags: ['Marriage', 'Divorce', 'Inheritance'],
        likes: 198,
        commentCount: 52,
        views: 1980,
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    }
];

export const DUMMY_LAWYERS: Lawyer[] = [
    {
        id: 'l1',
        name: 'Amina Nkrumah',
        email: 'amina.nkrumah@legalhub.cm',
        specialization: ['Real Estate', 'Land Law'],
        location: 'Douala, Cameroon',
        rating: 4.9,
        reviewCount: 156,
        yearsOfExperience: 14,
        hourlyRate: 25000,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Experienced property lawyer specializing in land disputes and customary law in Cameroon. I help families and businesses secure their land titles.',
        verified: true,
        availability: true
    },
    {
        id: 'l2',
        name: 'Chidi Okafor',
        email: 'chidi.okafor@legalhub.ng',
        specialization: ['Real Estate', 'Tenancy Law'],
        location: 'Lagos, Nigeria',
        rating: 4.8,
        reviewCount: 203,
        yearsOfExperience: 11,
        hourlyRate: 45000,
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Dedicated to protecting tenant rights and ensuring fair housing practices in Lagos. I have successfully mediated over 500 tenancy disputes.',
        verified: true,
        availability: true
    },
    {
        id: 'l3',
        name: 'Kwame Mensah',
        email: 'kwame.mensah@legalhub.gh',
        specialization: ['Business Law', 'Corporate Law'],
        location: 'Accra, Ghana',
        rating: 5.0,
        reviewCount: 98,
        yearsOfExperience: 16,
        hourlyRate: 350,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Ayekoo! I help entrepreneurs navigate business registration and corporate compliance in Ghana. Expert in the new Companies Act.',
        verified: true,
        availability: false
    },
    {
        id: 'l4',
        name: 'Fatou Diallo',
        email: 'fatou.diallo@legalhub.bf',
        specialization: ['Employment Law', 'Labor Rights'],
        location: 'Ouagadougou, Burkina Faso',
        rating: 4.7,
        reviewCount: 87,
        yearsOfExperience: 9,
        hourlyRate: 18000,
        avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Fighting for worker rights and fair employment practices across Burkina Faso. Specializing in wrongful termination and contract reviews.',
        verified: true,
        availability: true
    },
    {
        id: 'l5',
        name: 'Ibrahim Touré',
        email: 'ibrahim.toure@legalhub.gn',
        specialization: ['Family Law', 'Inheritance'],
        location: 'Conakry, Guinea',
        rating: 4.6,
        reviewCount: 72,
        yearsOfExperience: 12,
        hourlyRate: 15000,
        avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Compassionate family lawyer guiding clients through marriage, divorce, and inheritance matters with dignity and respect.',
        verified: true,
        availability: true
    },
    {
        id: 'l6',
        name: 'Ngozi Adeyemi',
        email: 'ngozi.adeyemi@legalhub.ng',
        specialization: ['Criminal Defense', 'Human Rights'],
        location: 'Abuja, Nigeria',
        rating: 4.9,
        reviewCount: 134,
        yearsOfExperience: 18,
        hourlyRate: 55000,
        avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Experienced criminal defense attorney with a strong track record in human rights cases. I advocate fearlessly for my clients.',
        verified: true,
        availability: true
    },
    {
        id: 'l7',
        name: 'Yaw Boateng',
        email: 'yaw.boateng@legalhub.gh',
        specialization: ['Intellectual Property', 'Technology Law'],
        location: 'Kumasi, Ghana',
        rating: 4.8,
        reviewCount: 61,
        yearsOfExperience: 8,
        hourlyRate: 280,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Tech-savvy lawyer helping businesses protect their intellectual property and navigate digital regulations.',
        verified: true,
        availability: true
    },
    {
        id: 'l8',
        name: 'Marie-Claire Kamga',
        email: 'marie.kamga@legalhub.cm',
        specialization: ['Tax Law', 'Business Compliance'],
        location: 'Yaoundé, Cameroon',
        rating: 4.7,
        reviewCount: 93,
        yearsOfExperience: 13,
        hourlyRate: 28000,
        avatar: 'https://images.unsplash.com/photo-1598550832236-81988180e226?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        bio: 'Expert in tax law and business compliance, helping companies navigate Cameroon\'s regulatory landscape.',
        verified: true,
        availability: true
    }
];

export const DUMMY_CASES: any[] = [
    {
        id: 'c1',
        title: 'Land Dispute in Bamenda',
        description: 'Seeking legal assistance for a boundary dispute with a neighbor over customary land in Bamenda.',
        caseType: 'Real Estate',
        severity: 'high',
        location: 'Bamenda, Cameroon',
        jurisdiction: 'Customary Court',
        status: 'under-review',
        attachments: [],
        isAnonymous: false,
        submittedBy: 'u1',
        submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        documents: []
    },
    {
        id: 'c2',
        title: 'Wrongful Termination - Lagos',
        description: 'Was terminated from my job without proper notice or severance pay. Need representation.',
        caseType: 'Employment',
        severity: 'medium',
        location: 'Lagos, Nigeria',
        jurisdiction: 'National Industrial Court',
        status: 'submitted',
        attachments: [],
        isAnonymous: true,
        submittedBy: 'u2',
        submittedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        documents: []
    },
    {
        id: 'c3',
        title: 'Business Registration Assistance',
        description: 'Need help registering a new tech startup with the Registrar General in Accra.',
        caseType: 'Business',
        severity: 'low',
        location: 'Accra, Ghana',
        jurisdiction: 'Registrar General\'s Department',
        status: 'resolved',
        attachments: [],
        isAnonymous: false,
        submittedBy: 'u1',
        submittedAt: new Date(Date.now() - 86400000 * 30).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 25).toISOString(),
        documents: []
    }
];

export const DUMMY_BOOKINGS: any[] = [
    {
        id: 'b1',
        lawyerId: 'l1',
        userId: 'u1',
        lawyerName: 'Amina Nkrumah',
        lawyerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
        duration: 60,
        type: 'video',
        status: 'confirmed',
        notes: 'Initial consultation regarding land dispute in Douala.',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'b2',
        lawyerId: 'l2',
        userId: 'u1',
        lawyerName: 'Chidi Okafor',
        lawyerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        scheduledAt: new Date(Date.now() + 86400000 * 5).toISOString(),
        duration: 30,
        type: 'phone',
        status: 'pending',
        notes: 'Questions about tenancy agreement in Lagos.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'b3',
        lawyerId: 'l6',
        userId: 'u1',
        lawyerName: 'Ngozi Adeyemi',
        lawyerImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
        scheduledAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        duration: 45,
        type: 'in-person',
        status: 'completed',
        notes: 'Past consultation in Abuja.',
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString()
    }
];

export const DUMMY_CHAT_SESSIONS: any[] = [
    {
        id: 's1',
        title: 'Tenancy Agreement Questions',
        messages: [
            { id: 'm1', content: 'Hi, I have a question about my tenancy agreement in Lagos.', role: 'user', timestamp: new Date(Date.now() - 100000).toISOString() },
            { id: 'm2', content: 'Hello! I can help with general legal information regarding tenancy in Lagos. What is your specific question?', role: 'assistant', timestamp: new Date(Date.now() - 90000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 100000).toISOString(),
        updatedAt: new Date(Date.now() - 90000).toISOString()
    },
    {
        id: 's2',
        title: 'Land Rights in Cameroon',
        messages: [
            { id: 'm3', content: 'What are my rights regarding customary land in Cameroon?', role: 'user', timestamp: new Date(Date.now() - 500000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 500000).toISOString(),
        updatedAt: new Date(Date.now() - 500000).toISOString()
    }
];

export const DUMMY_ANALYTICS: any = {
    totalCases: 15,
    casesByCategory: {
        'Real Estate': 6,
        'Employment': 4,
        'Business': 3,
        'Family Law': 2
    },
    casesByLocation: {
        'Lagos': 4,
        'Douala': 3,
        'Accra': 3,
        'Yaoundé': 2,
        'Abuja': 2,
        'Conakry': 1
    },
    casesBySeverity: {
        'high': 3,
        'medium': 7,
        'low': 5
    },
    resolutionRate: 68,
    averageResolutionTime: 18, // days
    trends: [
        { date: '2024-01', count: 3, category: 'Real Estate' },
        { date: '2024-02', count: 5, category: 'Employment' },
        { date: '2024-03', count: 4, category: 'Business' }
    ]
};
