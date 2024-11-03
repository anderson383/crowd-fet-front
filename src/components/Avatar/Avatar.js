import React from 'react';
import { Image, Dropdown } from 'react-bootstrap';
import { Gear, BoxArrowRight } from 'react-bootstrap-icons';

function Avatar({ src, name, size = 50, onOptionSelect }) {
    const getInitials = (name) => {
        const initials = name.split(' ').map((word) => word[0]).join('');
        return initials.toUpperCase().substring(0, 2);
    };

    return (
        <Dropdown onSelect={onOptionSelect}>
            <Dropdown.Toggle
                id="avatar-dropdown"
                variant="link"
                style={{
                    border: 'none',
                    padding: 0,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#ccc',
                    fontSize: size * 0.4,
                    color: '#fff',
                }}
            >
                {src ? (
                    <Image src={src} roundedCircle style={{ width: '100%', height: '100%' }} />
                ) : (
                    <span>{getInitials(name)}</span>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="settings">
                    <Gear className="me-2" /> Configuración
                </Dropdown.Item>
                <Dropdown.Item eventKey="logout">
                    <BoxArrowRight className="me-2" /> Cerrar sesión
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default Avatar;
