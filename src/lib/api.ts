import PostalMime, {Email} from "postal-mime";

export interface Mail {
    from: string,
    message_id: string,
    subject: string,
    timestamp: number
}

export async function getMailAt(mailBoxId: string): Promise<Mail[]> {
    return await (await fetch(`https://mail.re146.dev/api/list/${encodeURIComponent(mailBoxId)}`)).json();
}

export async function getMailDomains(): Promise<string[]> {
    return ["re146.dev"];
}

export async function getAndParseMailContentAt(mailBoxId: string, messageId: string): Promise<Email> {
    const response = await fetch(getMailContentUrl(mailBoxId, messageId));
    if (!response.body) {
        throw new Error("No body");
    }

    return await PostalMime.parse(response.body);
}

export function getMailContentUrl(mailBoxId: string, messageId: string): string {
    return `https://mail.re146.dev/storage/${encodeURIComponent(mailBoxId)}/${encodeURIComponent(messageId)}`;
}