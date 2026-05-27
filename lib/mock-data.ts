import { Article, Lawyer } from '@/types';

export const DUMMY_ARTICLES: Article[] = [
    {
        id: '1',
        title: 'Understanding Land Rights and Property Ownership in Cameroon',
        content: 'Land ownership in Cameroon involves both customary and statutory law...',
        author: {
            id: 'l1',
            name: 'Ngono Odile',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80'
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
        title: 'Your Rights During Police Custody in Cameroon',
        content: 'Under Law No. 2005/007 (Criminal Procedure Code), an accused person held in police custody has specific rights...',
        author: {
            id: 'l2',
            name: 'Nkongho Paul',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        },
        category: 'Criminal Law',
        tags: ['Police Custody', 'Criminal Procedure', 'Rights'],
        likes: 189,
        commentCount: 43,
        views: 1850,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
        id: '3',
        title: 'Women\'s Rights in Customary Marriages in Cameroon',
        content: 'Customary law in Cameroon governs a significant portion of family matters. Understanding how customary marriage interacts with civil registration...',
        author: {
            id: 'l3',
            name: 'Fombu Grace',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
        },
        category: 'Family Law',
        tags: ['Family Law', 'Customary Law', 'Women\'s Rights'],
        likes: 312,
        commentCount: 89,
        views: 3200,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
        id: '4',
        title: 'Wrongful Dismissal and Your Rights Under Cameroon Labour Law',
        content: 'The Labour Code of Cameroon provides comprehensive protections for workers facing termination without cause...',
        author: {
            id: 'l4',
            name: 'Atanga Erica',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=200&q=80'
        },
        category: 'Employment',
        tags: ['Employment', 'Worker Rights', 'Labour Law'],
        likes: 156,
        commentCount: 34,
        views: 1420,
        createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    },
    {
        id: '5',
        title: 'Presidential Election Eligibility Under the Electoral Code of Cameroon',
        content: 'The Electoral Code sets strict eligibility conditions for candidates seeking to contest presidential elections in Cameroon...',
        author: {
            id: 'l8',
            name: 'Ewane Bertrand',
            isLawyer: true,
            avatar: 'https://images.unsplash.com/photo-1536896407451-6e3dd976edd1?auto=format&fit=crop&w=200&q=80'
        },
        category: 'Electoral Law',
        tags: ['Elections', 'Electoral Code', 'Constitutional Law'],
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
        name: 'Ngono Odile',
        email: 'odile.ngono@legalhub.cm',
        specialization: ['Constitutional Law', 'Electoral Law'],
        location: 'Yaoundé, Cameroon',
        rating: 4.9,
        reviewCount: 143,
        yearsOfExperience: 16,
        hourlyRate: 75000,
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior constitutional lawyer with over 16 years interpreting and litigating cases under the Constitution of Cameroon. Advised government bodies on constitutional reform and electoral compliance.',
        verified: true,
        availability: true,
    },
    {
        id: 'l2',
        name: 'Nkongho Paul',
        email: 'paul.nkongho@legalhub.cm',
        specialization: ['Criminal Law', 'Criminal Procedure'],
        location: 'Douala, Cameroon',
        rating: 4.8,
        reviewCount: 211,
        yearsOfExperience: 12,
        hourlyRate: 55000,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        bio: 'Defence attorney specialising in criminal procedure under Law No. 2005/007. Represented clients across Cameroon in criminal matters ranging from petty offences to felonies.',
        verified: true,
        availability: true,
    },
    {
        id: 'l3',
        name: 'Fombu Grace',
        email: 'grace.fombu@legalhub.cm',
        specialization: ['Family & Customary Law'],
        location: 'Bamenda, Cameroon',
        rating: 4.9,
        reviewCount: 88,
        yearsOfExperience: 10,
        hourlyRate: 35000,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        bio: "Specialist in family law and customary court proceedings in the North West Region. Advocates for women's rights in customary marriages and inheritance disputes.",
        verified: true,
        availability: true,
    },
    {
        id: 'l4',
        name: 'Atanga Erica',
        email: 'erica.atanga@legalhub.cm',
        specialization: ['Labour Law', 'Employment'],
        location: 'Buea, Cameroon',
        rating: 4.7,
        reviewCount: 76,
        yearsOfExperience: 8,
        hourlyRate: 28000,
        avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=200&q=80',
        bio: 'Employment lawyer focused on worker rights, wrongful dismissal, and contract reviews under the Cameroonian Labour Code. Based in the South West Region.',
        verified: true,
        availability: false,
    },
    {
        id: 'l5',
        name: 'Mbarga Richard',
        email: 'richard.mbarga@legalhub.cm',
        specialization: ['Business Law', 'Corporate Law'],
        location: 'Yaoundé, Cameroon',
        rating: 4.8,
        reviewCount: 109,
        yearsOfExperience: 14,
        hourlyRate: 65000,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        bio: 'Corporate lawyer assisting SMEs and multinationals with business registration, compliance, and commercial contracts under OHADA law in Cameroon.',
        verified: true,
        availability: true,
    },
    {
        id: 'l6',
        name: 'Tchouaket Jean-Marie',
        email: 'jeanmarie.tchouaket@legalhub.cm',
        specialization: ['Mining Law', 'Natural Resources'],
        location: 'Douala, Cameroon',
        rating: 4.6,
        reviewCount: 54,
        yearsOfExperience: 11,
        hourlyRate: 80000,
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80',
        bio: 'Specialist in the Cameroonian Mining Code and related decrees. Advises extraction companies, artisanal miners, and state agencies on licensing, environmental obligations, and disputes.',
        verified: true,
        availability: true,
    },
    {
        id: 'l7',
        name: 'Ndikum Cynthia',
        email: 'cynthia.ndikum@legalhub.cm',
        specialization: ['Tax Law', 'Finance Law'],
        location: 'Bafoussam, Cameroon',
        rating: 4.7,
        reviewCount: 92,
        yearsOfExperience: 9,
        hourlyRate: 40000,
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
        bio: 'Tax and fiscal law practitioner with deep knowledge of the Cameroon Finance Law. Helps businesses and individuals navigate tax obligations and dispute resolutions with the DGI.',
        verified: true,
        availability: true,
    },
    {
        id: 'l8',
        name: 'Ewane Bertrand',
        email: 'bertrand.ewane@legalhub.cm',
        specialization: ['Electoral Law', 'Constitutional Law'],
        location: 'Yaoundé, Cameroon',
        rating: 4.5,
        reviewCount: 47,
        yearsOfExperience: 7,
        hourlyRate: 30000,
        avatar: 'https://images.unsplash.com/photo-1536896407451-6e3dd976edd1?auto=format&fit=crop&w=200&q=80',
        bio: 'Electoral and constitutional law counsel with experience in election observation, candidate eligibility disputes, and civic rights under the Electoral Code of Cameroon.',
        verified: false,
        availability: true,
    },
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
        title: 'Wrongful Termination - Douala',
        description: 'Was terminated from my job without proper notice or severance pay. Need representation.',
        caseType: 'Employment',
        severity: 'medium',
        location: 'Douala, Cameroon',
        jurisdiction: 'Labour Tribunal',
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
        description: 'Need help registering a new tech startup with the Centre de Formalites des Entreprises in Yaoundé.',
        caseType: 'Business',
        severity: 'low',
        location: 'Yaoundé, Cameroon',
        jurisdiction: 'CFE Yaoundé',
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
        lawyerName: 'Ngono Odile',
        lawyerImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
        scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
        duration: 60,
        type: 'video',
        status: 'confirmed',
        notes: 'Initial consultation regarding constitutional rights in Yaoundé.',
        createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
        id: 'b2',
        lawyerId: 'l2',
        userId: 'u1',
        lawyerName: 'Nkongho Paul',
        lawyerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        scheduledAt: new Date(Date.now() + 86400000 * 5).toISOString(),
        duration: 30,
        type: 'phone',
        status: 'pending',
        notes: 'Questions about criminal procedure and police custody rights.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'b3',
        lawyerId: 'l5',
        userId: 'u1',
        lawyerName: 'Mbarga Richard',
        lawyerImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        scheduledAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        duration: 45,
        type: 'in-person',
        status: 'completed',
        notes: 'Business registration consultation in Yaoundé.',
        createdAt: new Date(Date.now() - 86400000 * 15).toISOString()
    }
];

export const DUMMY_CHAT_SESSIONS: any[] = [
    {
        id: 's1',
        title: 'Rights During Police Custody',
        messages: [
            { id: 'm1', content: 'What are my rights if I am arrested in Cameroon?', role: 'user', timestamp: new Date(Date.now() - 100000).toISOString() },
            { id: 'm2', content: 'Under Law No. 2005/007 (Criminal Procedure Code), you have the right to be informed of the charges against you, the right to remain silent, and the right to legal counsel...', role: 'assistant', timestamp: new Date(Date.now() - 90000).toISOString() }
        ],
        createdAt: new Date(Date.now() - 100000).toISOString(),
        updatedAt: new Date(Date.now() - 90000).toISOString()
    },
    {
        id: 's2',
        title: 'Customary Land Rights in Bamenda',
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
        'Yaoundé': 5,
        'Douala': 4,
        'Bamenda': 3,
        'Buea': 2,
        'Bafoussam': 1
    },
    casesBySeverity: {
        'high': 3,
        'medium': 7,
        'low': 5
    },
    resolutionRate: 68,
    averageResolutionTime: 18,
    trends: [
        { date: '2024-01', count: 3, category: 'Real Estate' },
        { date: '2024-02', count: 5, category: 'Employment' },
        { date: '2024-03', count: 4, category: 'Business' }
    ]
};
