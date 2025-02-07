import Link from 'next/link'
import Image from 'next/image'

import IconHeartEmpty from '@/shared/icons/IconHeartEmpty'
import IconHeartFilled from '@/shared/icons/IconHeartFilled'

import { Character } from '../types/characterTypes'

interface CharacterCardProps extends Character {
  onToggleFavorite: () => void
}

export default function CharacterCard({
  name,
  image,
  isFavorite,
  onToggleFavorite,
}: Readonly<CharacterCardProps>) {
  return (
    <div className="characterCard">
      <Link href="/" passHref className="characterCard__link">
        <Image
          src={image}
          alt={name}
          className="characterCard__image"
          layout="responsive"
          width={500}
          height={500}
        />
      </Link>

      <div className="characterCard__footer">
        <h2 className="characterCard__name">{name}</h2>
        <button
          onClick={onToggleFavorite}
          className={`characterCard____favoriteButton${isFavorite ? ' characterCard____favoriteButton--active' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeartEmpty />}
        </button>
      </div>
    </div>
  )
}
