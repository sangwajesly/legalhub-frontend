import { Session, Message, SessionSummary } from '@/types';


/**
 * Groups chat sessions by time periods (Today, Yesterday, Last 7 Days, etc.)
 */
export function groupSessionsByDate(sessions: SessionSummary[]): Record<string, SessionSummary[]> {
    if (!Array.isArray(sessions)) {
        return {};
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setDate(lastMonth.getDate() - 30);

    const groups: Record<string, SessionSummary[]> = {
        Today: [],
        Yesterday: [],
        'Last 7 Days': [],
        'Last 30 Days': [],
        Older: [],
    };

    sessions.forEach((session) => {
        const sessionDate = new Date(session.timestamp); // Use timestamp
        const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());

        if (sessionDay.getTime() === today.getTime()) {
            groups.Today.push(session);
        } else if (sessionDay.getTime() === yesterday.getTime()) {
            groups.Yesterday.push(session);
        } else if (sessionDate >= lastMonth) {
            groups['Last 30 Days'].push(session);
        } else if (sessionDate >= lastWeek) {
            groups['Last 7 Days'].push(session);
        }
    });

    // Remove empty groups
    Object.keys(groups).forEach((key) => {
        if (groups[key].length === 0) {
            delete groups[key];
        }
    });

    return groups;
}

/**
 * Formats a timestamp for chat display
 */
export function formatChatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Extracts a preview text from the first user message in a session
 */
export function getSessionPreview(messages: Message[], maxLength: number = 60): string {
    if (!messages || messages.length === 0) return 'New conversation';

    const firstUserMessage = messages.find((msg) => msg.role === 'user');
    if (!firstUserMessage) return 'New conversation';

    const content = firstUserMessage.content.trim();
    if (content.length <= maxLength) return content;

    return content.substring(0, maxLength).trim() + '...';
}
