import sys
import unittest
import coverage
from unittest import result
from flask.cli import FlaskGroup
from project import create_app, db   # new
from project.api.models import User  # new

COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/config.py'
    ]
)
COV.start()


app = create_app()  # new
cli = FlaskGroup(create_app=create_app)  # new


@cli.command()
def cov():
    """Runs unit tests with coverage"""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print("Coverage summary:")
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    sys.exit(result)


@cli.command('recreate_db')
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command()
def test():
    """Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    sys.exit(result)


@cli.command('seed_db')
def seed_db():
    """Seeds the database."""
    db.session.add(User(
        username='michael',
        email='michael@reallynotreal.com',
        password='greaterthaneight'
    ))
    db.session.add(User(
        username='michaelherman',
        email='michael@mherman.org',
        password='greaterthaneight'
    ))
    db.session.commit()


if __name__ == '__main__':
    cli()
