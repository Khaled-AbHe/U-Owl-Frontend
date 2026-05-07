interface DealCardProps {
    badge: string;
    title: string;
    desc: string;
    price: string;
    unit: string;
}

export function DealCard(deal: DealCardProps) {
    return (
        <div
            className="home-card home-card--deal home-card--deal"
        >
            <div className="home-card__body">
            <span className="home-card__badge">{deal.badge}</span>
            <p className="home-card__title">{deal.title}</p>
            <p className="home-card__desc">{deal.desc}</p>
            <div className="home-card__price">
                {deal.price} <span>{deal.unit}</span>
            </div>
            </div>
        </div>
    )
}