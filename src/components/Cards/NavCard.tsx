import { ArrowRight, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface NavCardProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    cta: string;
    to: string;
}

export function NavCard(card: NavCardProps) {
    const Icon = card.icon;

    return (
        <Link to={card.to} className="home-card home-card--nav">
            <div className="home-card__body">
                <div className="home-card__icon-wrap">
                    <Icon size={24} />
                </div>
                <p className="home-card__title">{card.title}</p>
                <p className="home-card__desc">{card.desc}</p>
                <div className="home-card__footer">
                    <span className="home-card__cta">{card.cta}</span>
                    <ArrowRight size={16} className="home-card__arrow" />
                </div>
            </div>
        </Link>
    );
}