# Generated by Django 4.1.3 on 2022-12-23 16:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bidhistory', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bidhistory',
            options={'ordering': ['-price']},
        ),
    ]
